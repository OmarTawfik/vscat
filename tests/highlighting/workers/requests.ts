import path from "path";
import os from "os";
import {mkdirp, pathExists, readdir, readJson, rm, writeJson} from "fs-extra";

export interface RenderingRequest {
  readonly destination: string;
  readonly lines: readonly string[];
  readonly backgroundColor: string;
}

const REQUESTS_DIR = path.join(os.tmpdir(), "rendering-requests");

export class RequestWriter {
  private readonly requests: RenderingRequest[] = [];

  public constructor(public readonly suiteId: string) {}

  public add(request: RenderingRequest): void {
    this.requests.push(request);
  }

  public async writeToDisk(): Promise<void> {
    await mkdirp(REQUESTS_DIR);
    await writeJson(path.join(REQUESTS_DIR, this.suiteId + ".json"), this.requests);
  }

  public static async deserialize(): Promise<Map<string, readonly RenderingRequest[]>> {
    const results = new Map<string, readonly RenderingRequest[]>();
    if (!(await pathExists(REQUESTS_DIR))) {
      return results;
    }

    const fileNames = await readdir(REQUESTS_DIR);
    await Promise.all(
      fileNames.map(async (fileName) => {
        const suiteId = path.basename(fileName, path.extname(fileName));
        const requests = await readJson(path.join(REQUESTS_DIR, fileName));
        results.set(suiteId, requests);
      }),
    );

    await rm(REQUESTS_DIR, {recursive: true});
    return results;
  }
}
