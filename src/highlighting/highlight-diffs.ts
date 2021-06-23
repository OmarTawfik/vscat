import {calculateMarginWidth, splitLines} from "./trivia";
import * as diff from "diff";
import {colorizeTokens} from "./colorize-tokens";
import {ThemeWrapper} from "../themes/theme-wrapper";
import {HighlightDiffOptions} from "../options";
import {MARGIN_MIDDLE, CONTEXT_LINES, MARGIN_UP, MARGIN_DOWN} from "./trivia";

interface DiffLine {
  readonly beforeLineNumber: number;
  readonly afterLineNumber: number;
}

type ChunkType = "inserted" | "removed" | "same";

interface Chunk {
  readonly lines: readonly DiffLine[];
  readonly type: ChunkType;
}

export async function highlightDiff(options: HighlightDiffOptions): Promise<string[]> {
  const {beforeSource, afterSource, themeIdOrPath, width} = options;

  const chunks = computeDifferences(beforeSource, afterSource);
  if (chunks.length === 1 && chunks[0].type === "same") {
    // No changes
    return [];
  }

  const theme = await ThemeWrapper.create(themeIdOrPath);
  const marginBrush = theme.foreground("editorLineNumber.foreground");
  const insertedBrush = theme.background("diffEditor.insertedTextBackground");
  const removedBrush = theme.background("diffEditor.removedTextBackground");

  const widestMargin = Math.max(calculateMarginWidth(beforeSource), calculateMarginWidth(afterSource));
  const sourceWidth = width - (widestMargin + MARGIN_MIDDLE.length) * 2 - 1;
  const beforeColorized = await colorizeTokens(beforeSource, sourceWidth, options);
  const afterColorized = await colorizeTokens(afterSource, sourceWidth, options);

  const renderHiddenRangeLine = (arrow: string) =>
    marginBrush((" ".repeat(widestMargin) + arrow).repeat(2)) + " ".repeat(sourceWidth);

  const result: string[] = [];
  chunks.forEach(({type, lines}, chunkIndex, chunks) => {
    function renderLine({beforeLineNumber, afterLineNumber}: DiffLine): string {
      switch (type) {
        case "inserted":
          return (
            marginBrush(" ".repeat(widestMargin) + MARGIN_MIDDLE) +
            marginBrush((afterLineNumber + 1).toString().padStart(widestMargin) + MARGIN_MIDDLE) +
            insertedBrush(afterColorized[afterLineNumber])
          );
        case "removed":
          return (
            marginBrush((beforeLineNumber + 1).toString().padStart(widestMargin) + MARGIN_MIDDLE) +
            marginBrush(" ".repeat(widestMargin) + MARGIN_MIDDLE) +
            removedBrush(beforeColorized[beforeLineNumber])
          );
        case "same":
          return (
            marginBrush((beforeLineNumber + 1).toString().padStart(widestMargin) + MARGIN_MIDDLE) +
            marginBrush((afterLineNumber + 1).toString().padStart(widestMargin) + MARGIN_MIDDLE) +
            beforeColorized[beforeLineNumber]
          );
      }
    }

    if (type === "same") {
      if (chunkIndex === 0 && lines.length > CONTEXT_LINES + 1) {
        result.push(renderHiddenRangeLine(MARGIN_UP), ...lines.slice(lines.length - CONTEXT_LINES).map(renderLine));
        return;
      }

      if (chunkIndex === chunks.length - 1 && lines.length > CONTEXT_LINES + 1) {
        result.push(...lines.slice(0, CONTEXT_LINES).map(renderLine), renderHiddenRangeLine(MARGIN_DOWN));
        return;
      }

      if (lines.length > CONTEXT_LINES * 2 + 2) {
        result.push(
          ...lines.slice(0, CONTEXT_LINES).map(renderLine),
          renderHiddenRangeLine(MARGIN_DOWN),
          renderHiddenRangeLine(MARGIN_UP),
          ...lines.slice(lines.length - CONTEXT_LINES).map(renderLine),
        );
        return;
      }
    }

    result.push(...lines.map(renderLine));
  });

  const backgroundBrush = theme.background("editor.background");
  return result.map((line) => backgroundBrush(" " + line));
}

function computeDifferences(before: string, after: string): Chunk[] {
  let beforeLineCounter = 0;
  let afterLineCounter = 0;

  return diff.diffLines(before, after).map((change) => {
    const lines: DiffLine[] = splitLines(change.value.replace(/\r?\n$/, "")).map((_, delta) => ({
      beforeLineNumber: beforeLineCounter + delta,
      afterLineNumber: afterLineCounter + delta,
    }));

    let type: ChunkType;
    if (change.added) {
      type = "inserted";
      afterLineCounter += lines.length;
    } else if (change.removed) {
      type = "removed";
      beforeLineCounter += lines.length;
    } else {
      type = "same";
      afterLineCounter += lines.length;
      beforeLineCounter += lines.length;
    }

    return {type, lines};
  });
}
