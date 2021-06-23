import {readFile} from "fs-extra";
import {detectLanguage} from "../../../src/languages/language-detection";
import {resolveSourceFile, TESTS_WIDTH} from "../utils";
import {createHighlightingTestSuite} from "../create-suite";
import {highlightDiff} from "../../../src/highlighting/highlight-diffs";

createHighlightingTestSuite(__dirname, async ({testDir, themeId, languageId}) => {
  const beforePath = await resolveSourceFile(testDir, "before");
  const beforeSource = await readFile(beforePath, "utf8");
  expect(languageId).toEqual(await detectLanguage(beforePath, beforeSource));

  const afterPath = await resolveSourceFile(testDir, "after");
  const afterSource = await readFile(afterPath, "utf8");
  expect(languageId).toEqual(await detectLanguage(afterPath, afterSource));

  const lines = await highlightDiff({
    beforeSource,
    afterSource,
    width: TESTS_WIDTH,
    languageIdOrPath: languageId,
    themeIdOrPath: themeId,
  });

  return {
    lines,
    sources: [beforeSource, afterSource],
  };
});
