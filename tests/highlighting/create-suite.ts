import {readdir, readJSONSync, unlink} from "fs-extra";
import path from "path";
import "jest-specific-snapshot";
import fs from "fs";
import {GrammarWrapper} from "../../src/languages/grammar-wrapper";
import {ThemeWrapper} from "../../src/themes/theme-wrapper";
import {RequestWriter} from "./workers/requests";
import {ThemeMetadataFile} from "../../src/themes/metadata";
import chalk from "chalk";
import {splitLines} from "../../src/highlighting/trivia";
import {getVariationBackground} from "../../scripts/utils";

export interface TestFactoryResults {
  readonly lines: readonly string[];
  readonly sources: readonly string[];
}

export interface TestFactoryOptions {
  readonly testDir: string;
  readonly themeId?: string;
  readonly languageId?: string;
}

export function createHighlightingTestSuite(
  rootDir: string,
  callback: (options: TestFactoryOptions) => Promise<TestFactoryResults>,
): void {
  const suiteId = path.basename(rootDir);
  describe(`${suiteId} suite`, () => {
    const requests = new RequestWriter(suiteId);
    const themeMetadata: ThemeMetadataFile = readJSONSync(path.join(__dirname, "../../metadata/themes.json"));

    const originalLevel = chalk.level;
    beforeAll(() => {
      chalk.level = 3; // all colors
    });
    afterAll(() => {
      chalk.level = originalLevel;
    });

    for (const languageId of fs.readdirSync(rootDir)) {
      if (languageId.endsWith(".test.ts")) {
        continue;
      }

      const languageDir = path.join(rootDir, languageId);

      describe(`${languageId} language`, () => {
        for (const testId of fs.readdirSync(languageDir)) {
          const testDir = path.join(languageDir, testId);
          const resultsDir = path.join(testDir, "results");
          const discoveredResults: string[] = [];

          describe(`${testId} test`, () => {
            defineTest(undefined, "#000000");

            for (const theme of themeMetadata) {
              defineTest(theme.id, getVariationBackground(theme.variation));
            }

            function defineTest(themeId: string | undefined, backgroundColor: string): void {
              it(`${themeId} theme`, async () => {
                const {sources, lines} = await callback({testDir, themeId, languageId});

                const outputFileName = `output.${themeId}.ts`;
                const outputFullPath = path.join(resultsDir, outputFileName);
                discoveredResults.push(outputFileName);

                const theme = await ThemeWrapper.create(themeId);
                const grammar = await theme.loadGrammar(languageId);
                expect({
                  lines,
                  tokens: sources.map((source) => serializeTokens(source, grammar)),
                }).toMatchSpecificSnapshot(outputFullPath);

                const screenshotFileName = `screenshot.${themeId}.png`;
                const screenshotFullPath = path.join(resultsDir, screenshotFileName);

                discoveredResults.push(screenshotFileName);
                requests.add({destination: screenshotFullPath, lines, backgroundColor});
              });
            }

            afterAll(async () => {
              const allResults = await readdir(resultsDir);
              await Promise.all(
                allResults.map(async (result) => {
                  if (!discoveredResults.includes(result)) {
                    await unlink(path.join(resultsDir, result));
                  }
                }),
              );
            });
          });
        }
      });

      afterAll(async () => {
        await requests.writeToDisk();
      });
    }
  });
}

function serializeTokens(source: string, grammar: GrammarWrapper): string {
  const lines = splitLines(source);
  const tokens = grammar.tokenizeLines(lines);

  return (
    "\n" +
    tokens
      .map((line, lineIndex) => {
        const margin = lineIndex.toString().padStart(2, " ") + " │ ";
        if (line.length === 0) {
          return `${margin}none  │         │`;
        }

        return line
          .map(({line, startColumn, endColumn, foregroundColor}) => {
            expect(line).toEqual(lineIndex);
            return [
              margin,
              startColumn.toString().padStart(2),
              ",",
              endColumn.toString().padStart(2),
              " │ ",
              foregroundColor || "───────",
              " │ ",
              lines[lineIndex].substring(startColumn, endColumn),
            ].join("");
          })
          .join("\n");
      })
      .join(`\n───┼───────┼─────────┼──────────────────────────────────────────────────\n`) +
    "\n"
  );
}
