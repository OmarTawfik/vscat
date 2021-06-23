import {readFile} from "fs-extra";
import {detectLanguage} from "../../../src/languages/language-detection";
import {highlightSource} from "../../../src/highlighting/highlight-source";
import {resolveSourceFile, TESTS_WIDTH} from "../utils";
import {createHighlightingTestSuite} from "../create-suite";

createHighlightingTestSuite(__dirname, async ({testDir, themeId, languageId}) => {
  const sourcePath = await resolveSourceFile(testDir, "source");
  const source = await readFile(sourcePath, "utf8");
  expect(languageId).toEqual(await detectLanguage(sourcePath, source));

  const lines = await highlightSource({
    source,
    width: TESTS_WIDTH,
    languageIdOrPath: languageId,
    themeIdOrPath: themeId,
  });

  return {
    lines,
    sources: [source],
  };
});
