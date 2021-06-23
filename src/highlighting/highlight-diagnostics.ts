import {calculateMarginWidth, splitLines} from "./trivia";
import {LineComposer} from "./line-composer";
import {DiagnosticSeverity, HighlightDiagnosticOptions} from "../options";
import {Brush, ThemeWrapper} from "../themes/theme-wrapper";
import {colorizeTokens} from "./colorize-tokens";
import {CONTEXT_LINES, MARGIN_MIDDLE, SQUIGGLY_MARKER} from "./trivia";

export async function highlightDiagnostic(options: HighlightDiagnosticOptions): Promise<string[]> {
  const {
    source,
    range: {from, to},
    severity,
    themeIdOrPath,
    width,
  } = options;

  const marginWidth = calculateMarginWidth(source, to.line - from.line + 1);
  const sourceWidth = width - marginWidth - MARGIN_MIDDLE.length - 1;

  const theme = await ThemeWrapper.create(themeIdOrPath);
  const marginBrush = theme.foreground("editorLineNumber.foreground");
  const diagnosticBrush = getDiagnosticColor(theme, severity);

  const colorized = await colorizeTokens(source, sourceWidth, options);
  const highlighted = colorized.map((line, lineIndex) => {
    const lineNumber = (lineIndex + 1).toString().padStart(marginWidth, " ");
    return marginBrush(lineNumber + MARGIN_MIDDLE) + line;
  });

  let lineIndex = from.line;
  let i = from.line;
  const originalLines = splitLines(source);

  for (; lineIndex <= to.line; lineIndex++, i += 2) {
    const startColumn = lineIndex === from.line ? from.column : 0;
    const endColumn = lineIndex === to.line ? to.column : originalLines[lineIndex].length;

    const composer = new LineComposer(sourceWidth, theme, /* renderWhitespace */ false);

    composer.append(" ".repeat(startColumn));
    composer.append(SQUIGGLY_MARKER.repeat(endColumn - startColumn), diagnosticBrush);

    highlighted.splice(i + 1, 0, " ".repeat(marginWidth) + marginBrush(MARGIN_MIDDLE) + composer.compose());
  }

  const startLine = Math.max(0, from.line - CONTEXT_LINES);
  const endLine = Math.min(highlighted.length, i + CONTEXT_LINES);

  const backgroundBrush = theme.background("editor.background");
  return highlighted.slice(startLine, endLine).map((line) => backgroundBrush(" " + line));
}

function getDiagnosticColor(theme: ThemeWrapper, severity: DiagnosticSeverity): Brush {
  switch (severity) {
    case DiagnosticSeverity.Error:
      return theme.foreground("editorError.foreground");
    case DiagnosticSeverity.Warning:
      return theme.foreground("editorWarning.foreground");
    case DiagnosticSeverity.Info:
      return theme.foreground("editorInfo.foreground");
    case DiagnosticSeverity.Hint:
      return theme.foreground("editorHint.foreground");
  }
}
