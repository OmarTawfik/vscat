import path from "path";
import workerpool from "workerpool";
import os from "os";
import {TerminalScreenshotOptions} from "terminal-screenshot";
import {createHash} from "crypto";
import {pathExists, readJson, writeJson} from "fs-extra";
import colors from "colors";
import {RenderingRequest, RequestWriter} from "./requests";
import progress from "cli-progress";
import chalk from "chalk";

const CACHE_FILE_PATH = path.join(os.tmpdir(), "rendering-reporter-cache.json");

export async function renderScreenshots(): Promise<void> {
  if (process.env.CI) {
    logMessage("Screenshot rendering was skipped because of CLI flags.");
    return;
  }

  const requestsMap = await RequestWriter.deserialize();
  const totalRequests = [...requestsMap.values()].flat().length;

  logMessage(`${totalRequests} screenshots to update.`);
  if (requestsMap.size === 0) {
    return;
  }

  const startTime = new Date();
  const pool = workerpool.pool(path.join(__dirname, "worker.js"));
  const cache: Record<string, string> = (await pathExists(CACHE_FILE_PATH)) ? await readJson(CACHE_FILE_PATH) : {};

  const multibar = new progress.MultiBar({
    clearOnComplete: false,
    hideCursor: true,
    format: `[${colors.gray("{bar}")}] {percentage}% of {suiteId} ({value}/{total})`,
  });

  await Promise.all(
    [...requestsMap].map(async ([suiteId, requests]) => {
      const bar = multibar.create(requests.length, 0, {suiteId});

      await Promise.all(
        requests.map(async (request) => {
          await execute(request);
          bar.increment(1, {suiteId});
        }),
      );

      bar.stop();
    }),
  );

  multibar.stop();
  await pool.terminate();
  await writeJson(CACHE_FILE_PATH, cache);

  const endTime = new Date();
  const seconds = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2);
  logMessage(`${totalRequests} screenshots updated in ${seconds} seconds.`);

  async function execute(request: RenderingRequest): Promise<void> {
    const hash = await createHash("md5").update(JSON.stringify(request)).digest("hex");
    if (await screenshotExists(request, hash)) {
      return;
    }

    await render(request);
    cache[request.destination] = hash;
  }

  async function screenshotExists(options: RenderingRequest, hash: string): Promise<boolean> {
    if (process.argv.includes("--updateSnapshot") || process.argv.includes("-u")) {
      // Jest update snapshots
      return false;
    }

    if (!(await pathExists(options.destination))) {
      // Missing image
      return false;
    }

    return hash === cache[options.destination];
  }

  async function render({lines, destination, backgroundColor}: RenderingRequest): Promise<void> {
    const options: TerminalScreenshotOptions = {
      data: lines.join("\r\n"),
      backgroundColor,
      margin: 10,
      fontFamily: "Monaco",
      type: "png",
    };

    let lastError: Error;
    for (let retry = 0; retry < 3; retry++) {
      try {
        await pool.exec("renderScreenshot", [options, destination]);
        return;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError!;
  }

  function logMessage(message: string): void {
    console.log(chalk.cyanBright(`\n✂  ${message}\n`));
  }
}
