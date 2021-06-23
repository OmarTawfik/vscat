import {readFile, readJson} from "fs-extra";
import {detectLanguage} from "../../../src/languages/language-detection";
import {resolveSourceFile, TESTS_WIDTH} from "../utils";
import {createHighlightingTestSuite} from "../create-suite";
import joi from "joi";
import path from "path";
import {highlightDiagnostic} from "../../../src/highlighting/highlight-diagnostics";
import {DiagnosticSeverity} from "../../../src/options";

const DIAGNOSTIC_SCHEMA = joi
  .object({
    severity: joi
      .string()
      .required()
      .valid(DiagnosticSeverity.Error, DiagnosticSeverity.Warning, DiagnosticSeverity.Info, DiagnosticSeverity.Hint),
    range: joi
      .object({
        from: joi.object({line: joi.number().required(), column: joi.number().required()}).required(),
        to: joi.object({line: joi.number().required(), column: joi.number().required()}).required(),
      })
      .required(),
  })
  .required();

createHighlightingTestSuite(__dirname, async ({testDir, themeId, languageId}) => {
  const sourcePath = await resolveSourceFile(testDir, "source");
  const source = await readFile(sourcePath, "utf8");
  expect(languageId).toEqual(await detectLanguage(sourcePath, source));

  const diagnostic = await readJson(path.join(testDir, "details.json"));
  joi.attempt(diagnostic, DIAGNOSTIC_SCHEMA);

  const lines = await highlightDiagnostic({
    source,
    range: diagnostic.range,
    severity: diagnostic.severity,
    width: TESTS_WIDTH,
    languageIdOrPath: languageId,
    themeIdOrPath: themeId,
  });

  return {
    lines,
    sources: [source],
  };
});
