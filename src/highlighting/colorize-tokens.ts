import {splitLines} from "./trivia";
import {LineComposer} from "./line-composer";
import {BaseHighlightOptions} from "../options";
import {ThemeWrapper} from "../themes/theme-wrapper";
import chalk from "chalk";

export async function colorizeTokens(
  source: string,
  width: number,
  {themeIdOrPath, languageIdOrPath}: BaseHighlightOptions,
): Promise<string[]> {
  const lines = splitLines(source);
  const theme = await ThemeWrapper.create(themeIdOrPath);

  const grammarWrapper = await theme.loadGrammar(languageIdOrPath);
  const tokens = grammarWrapper.tokenizeLines(lines);

  return lines.map((line, lineIndex) => {
    const composer = new LineComposer(width, theme);

    let lastCharTaken = 0;
    for (const {startColumn, endColumn, foregroundColor} of tokens[lineIndex]) {
      if (startColumn > lastCharTaken) {
        composer.append(line.substring(lastCharTaken, startColumn));
      }

      const brush = foregroundColor ? chalk.hex(foregroundColor) : undefined;
      composer.append(line.substring(startColumn, endColumn), brush);

      lastCharTaken = endColumn;
    }

    if (lastCharTaken < line.length) {
      composer.append(line.substring(lastCharTaken));
    }

    return composer.compose();
  });
}
