import {readdir} from "fs-extra";
import path from "path";

export const TESTS_WIDTH = 80;

export async function resolveSourceFile(dir: string, baseName: string): Promise<string> {
  for (const candidate of await readdir(dir)) {
    if (candidate.startsWith(baseName)) {
      return path.join(dir, candidate);
    }
  }

  throw new Error(`Cannot find '${baseName}' file under: ${dir}`);
}
