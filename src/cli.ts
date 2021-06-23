#!/usr/bin/env node

import {Command} from "commander";
import {pathExists, readFile} from "fs-extra";
import {highlightDiagnostic, highlightDiff, highlightSource} from ".";
import {detectLanguage} from "./languages/language-detection";
import {getSupportedThemes} from "./themes/metadata";
import {getSupportedLanguages} from "./languages/metadata";
import {splitLines} from "./highlighting/trivia";

const program = new Command("vscat")
  .description("Highlight source code using VS Code themes and grammars!")
  .helpOption("-h, --help", "display usage help.")
  .option(
    "-t, --theme [theme]",
    "Specifies which VS Code theme to use. Accepts a supported themeId or an explicit theme path.",
    "default-high-contrast",
  )
  .option(
    "-l, --language [language]",
    "Specifies the programming language. Accepts a supported languageId or an explicit JSON textmate grammar path. (omit to automatically detect)",
  )
  .option("-w, --width [width]", "Specifies width (in columns) of rendered output. (omit to automatically detect)");

program
  .addCommand(
    new Command("source")
      .arguments("<source>")
      .description("Highlights a single source file.")
      .action(
        errorBoundary(async (sourceFilePath) => {
          const {theme, language, width} = program.opts();
          const source = await readSourceFile(sourceFilePath);

          const result = await highlightSource({
            themeIdOrPath: theme,
            languageIdOrPath: language || (await detectLanguage(sourceFilePath, source)),
            width: width || detectWidth(source),
            source,
          });

          result.forEach((line) => console.log(line));
        }),
      ),
    {
      isDefault: true,
    },
  )
  .addCommand(
    new Command("diff")
      .arguments("<before> <after>")
      .description("Highlights difference between two files.")
      .action(
        errorBoundary(async (beforeFilePath, afterFilePath) => {
          let {theme, language, width} = program.opts();
          const beforeSource = await readSourceFile(beforeFilePath);
          const afterSource = await readSourceFile(afterFilePath);

          if (!language) {
            const beforeLanguage = await detectLanguage(beforeFilePath, beforeSource);
            const afterLanguage = await detectLanguage(afterFilePath, afterSource);

            if (!beforeLanguage) {
              language = afterLanguage;
            } else if (!afterLanguage) {
              language = beforeLanguage;
            } else if (beforeLanguage !== afterLanguage) {
              throw new Error(
                `Detected different languages for input files [${beforeLanguage}] vs [${afterLanguage}]. Need to explicitly set the language option.`,
              );
            } else {
              language = beforeLanguage;
            }
          }

          const result = await highlightDiff({
            themeIdOrPath: theme,
            languageIdOrPath: language,
            width: width || detectWidth(beforeSource, afterSource),
            beforeSource,
            afterSource,
          });

          result.forEach((line) => console.log(line));
        }),
      ),
  )
  .addCommand(
    new Command("diagnostics")
      .arguments("<source>")
      .description("Highlights a single source file with a diagnostic range.")
      .requiredOption("--from <line,column>", "Starting position of the diagnostic.", parsePosition)
      .requiredOption("--to <line,column>", "Ending position of the diagnostic.", parsePosition)
      .option("--severity <severity>", "Supports 'error', 'warning', 'info', and 'hint'.", "error")
      .action(
        errorBoundary(async (sourceFilePath, commandOptions) => {
          const {theme, language, width} = program.opts();
          const {from, to, severity} = commandOptions;
          const source = await readSourceFile(sourceFilePath);

          const result = await highlightDiagnostic({
            themeIdOrPath: theme,
            languageIdOrPath: language || (await detectLanguage(sourceFilePath, source)),
            width: width || detectWidth(source),
            source,
            severity: severity,
            range: {
              from: {line: from[0], column: from[1]},
              to: {line: to[0], column: to[1]},
            },
          });

          result.forEach((line) => console.log(line));
        }),
      ),
  )
  .addCommand(
    new Command("list-themes").description("Lists all supported themes.").action(async () => {
      const themes = await getSupportedThemes();
      console.log(themes.map((t) => t.id).join("\n"));
    }),
  )
  .addCommand(
    new Command("list-languages").description("Lists all supported languages.").action(async () => {
      const languages = await getSupportedLanguages();
      console.log(languages.map((l) => l.id).join("\n"));
    }),
  )
  .exitOverride((error) => {
    if (error.code === "commander.helpDisplayed") {
      process.exit();
    }

    // Error details are already printed to user.
    process.exit(1);
  })
  .parse();

async function readSourceFile(filePath: string): Promise<string> {
  if (!(await pathExists(filePath))) {
    throw new Error("File not found: " + filePath);
  }

  return readFile(filePath, "utf8");
}

function detectWidth(...sources: string[]): number {
  return (
    process.stdout.columns ||
    Math.max(
      ...sources
        .map(splitLines)
        .flat()
        .map((l) => l.length),
    )
  );
}

function parsePosition(value: string): number[] {
  if (!/^\d+,\d+$/.test(value)) {
    throw new Error("Position must be specified in the format <from,to>");
  }

  return value.split(",").map((value) => parseInt(value, 10));
}

function errorBoundary<T>(action: (...args: T[]) => Promise<void>): (...args: T[]) => Promise<void> {
  return async (...args) => {
    try {
      await action(...args);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  };
}
