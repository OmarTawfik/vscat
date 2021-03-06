import path from "path";
import micromatch from "micromatch";
import {getSupportedLanguages} from "./metadata";
import {splitLines} from "../highlighting/trivia";

export async function detectLanguage(filePath: string, contents: string): Promise<string | undefined> {
  if (!path.isAbsolute(filePath)) {
    filePath = path.resolve(filePath);
  }

  const languages = await getSupportedLanguages();
  for (const {id, extensions, fileNamePatterns, firstLines, fileNames} of languages) {
    if (extensions.includes(path.extname(filePath))) {
      return id;
    }

    if (fileNames.includes(path.basename(filePath))) {
      return id;
    }

    if (
      [true, false].some((matchBase) => {
        return micromatch.isMatch(filePath, fileNamePatterns, {matchBase});
      })
    ) {
      return id;
    }

    const firstLine = splitLines(contents)[0];
    if (firstLines.some((pattern) => new RegExp(pattern).test(firstLine))) {
      return id;
    }
  }

  return undefined;
}
