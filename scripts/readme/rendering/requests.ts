import {mkdirp, pathExists, rm} from "fs-extra";
import path from "path";
import readline from "readline";
import os from "os";
import clipboardy from "clipboardy";
import {REPO_ROOT} from "../../../src/utils";
import progress from "cli-progress";
import PromiseQueue from "promise-queue";
import assert from "assert";

export abstract class BaseRenderingRequest {
  public abstract run(imagePath: string): Promise<void>;
}

const KEYS: string[] = [];
const REQUESTS: BaseRenderingRequest[] = [];

export function addRequest(request: BaseRenderingRequest): string {
  const key = `__RENDERING_REQUEST_${REQUESTS.length + 1}__`;
  KEYS.push(key);
  REQUESTS.push(request);
  return key;
}

export async function flushRequests(contents: string): Promise<string> {
  const imagesDir = path.join(await REPO_ROOT, "out", "readme-renders");
  if (await pathExists(imagesDir)) {
    await rm(imagesDir, {recursive: true});
  }

  await mkdirp(imagesDir);
  console.log(`Writing images to: ${imagesDir}`);
  await executeAllRequests(imagesDir);

  const urls = await runUploadWorkflow(imagesDir);
  assert(KEYS.length === urls.length, `Expected ${KEYS.length} images but parsed ${urls.length} instead.`);

  for (let i = 0; i < KEYS.length; i++) {
    contents = contents.replaceAll(KEYS[i], urls[i]);
  }

  return contents;
}

async function executeAllRequests(imagesDir: string): Promise<string> {
  const bar = new progress.Bar({
    clearOnComplete: false,
    hideCursor: true,
    format: `[{bar}] {percentage}% of images ({value}/{total})`,
  });

  bar.start(REQUESTS.length, 0);

  const PARALLELISM = os.cpus().length;
  process.setMaxListeners(PARALLELISM);
  const queue = new PromiseQueue(/* maxPendingPromises */ PARALLELISM);

  await Promise.all(
    REQUESTS.map(async (request, requestIndex) => {
      await queue.add(async () => {
        const imagePath = path.join(imagesDir, `${KEYS[requestIndex]}.png`);
        await request.run(imagePath);
      });
      bar.increment(1);
    }),
  );

  bar.stop();
  return imagesDir;
}

async function runUploadWorkflow(imagesDir: string): Promise<string[]> {
  await clipboardy.write(imagesDir);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  await new Promise<void>((resolve) =>
    rl.question("Path copied to clipboard. Please copy back the generated markdown tags, and press any key.", () => {
      rl.close();
      resolve();
    }),
  );

  const tags = await clipboardy.read();
  const urls = tags
    .trim()
    .split("\n")
    .map((line) => {
      const match = /^!\[__RENDERING_REQUEST_\d+__\]\((https:\/\/.*\.png)\)$/.exec(line);
      if (!match) {
        throw new Error("Invalid line format: " + line);
      }

      return match[1];
    });

  return urls;
}
