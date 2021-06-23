import {colorizeTokens} from "./colorize-tokens";
import {calculateMarginWidth, MARGIN_MIDDLE} from "./trivia";
import {ThemeWrapper} from "../themes/theme-wrapper";
import {HighlightSourceOptions} from "../options";

export async function highlightSource(options: HighlightSourceOptions): Promise<string[]> {
  const {source, themeIdOrPath, width} = options;

  const marginWidth = calculateMarginWidth(source);
  const sourceWidth = width - marginWidth - MARGIN_MIDDLE.length - 1;
  const colorized = await colorizeTokens(source, sourceWidth, options);

  const theme = await ThemeWrapper.create(themeIdOrPath);
  const marginBrush = theme.foreground("editorLineNumber.foreground");
  const backgroundBrush = theme.background("editor.background");

  return colorized.map((line, lineIndex) => {
    const lineNumber = (lineIndex + 1).toString().padStart(marginWidth, " ");
    return backgroundBrush(" " + marginBrush(lineNumber + MARGIN_MIDDLE) + line);
  });
}
