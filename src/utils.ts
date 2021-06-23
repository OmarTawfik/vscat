import {pathExists, readJson} from "fs-extra";
import path from "path";

const CACHE = new Map<string, any>();
export async function readAndCacheFile<T>(...parts: string[]): Promise<T> {
  const filePath = path.join(...parts);
  let entry = CACHE.get(filePath);
  if (!entry) {
    entry = await readJson(filePath);
    CACHE.set(filePath, entry);
  }

  return entry;
}

export const REPO_ROOT: Promise<string> = (async () => {
  let currentDir = __dirname;

  while (true) {
    if (currentDir === path.resolve("/")) {
      throw new Error("Cannot determine repository root.");
    }

    if (await pathExists(path.join(currentDir, "package.json"))) {
      return currentDir;
    }

    currentDir = path.dirname(currentDir);
  }
})();
