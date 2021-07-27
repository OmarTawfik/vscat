import {ELEPSIS, TAB_REPLACEMENT, SPACE_REPLACEMENT} from "./trivia";
import {Brush, ThemeWrapper} from "../themes/theme-wrapper";

export class LineComposer {
  private parts: [string, Brush][] = [];

  public constructor(
    private readonly width: number,
    private readonly theme: ThemeWrapper,
    private readonly renderWhitespace = true,
  ) {}

  public append(part: string, brush = this.theme.foreground("editor.foreground")): void {
    if (part.length === 0) {
      return;
    }

    if (!this.renderWhitespace) {
      this.parts.push([part, brush]);
      return;
    }

    this.processWhitespace(part, / /g, SPACE_REPLACEMENT, (betweenSpaces) => {
      this.processWhitespace(betweenSpaces, /\t/g, TAB_REPLACEMENT, (betweenTabs) => {
        this.parts.push([betweenTabs, brush]);
      });
    });
  }

  public compose(): string {
    let remainingWidth = this.width;
    const coloredParts: string[] = [];

    for (let i = 0; i < this.parts.length; i++) {
      const [value, brush] = this.parts[i];

      // Whole part fits, just add it:
      if (value.length < remainingWidth) {
        coloredParts.push(brush(value));
        remainingWidth -= value.length;
        continue;
      }

      // Whole part fits, but nothing more would be added.
      if (value.length === remainingWidth) {
        if (i + 1 === this.parts.length) {
          // This is the last part. Add as-is.
          coloredParts.push(brush(value));
        } else {
          // There are more parts, add elepsis and skip the rest
          const clippedValue = value.substr(0, value.length - ELEPSIS.length) + ELEPSIS;
          coloredParts.push(brush(clippedValue));
        }
      } else {
        // Only a substring of the part can fit
        const clippedValue = value.substr(0, remainingWidth - ELEPSIS.length) + ELEPSIS;
        coloredParts.push(brush(clippedValue));
      }

      remainingWidth = 0;
      break;
    }

    return coloredParts.join("") + " ".repeat(remainingWidth);
  }

  private processWhitespace(value: string, separator: RegExp, replacement: string, next: (_: string) => void): void {
    const parts = value.split(separator);
    if (parts.length === 0) {
      return;
    }

    next(parts[0]);
    const whitespaceBrush = this.theme.foreground("editorWhitespace.foreground");

    for (let i = 1; i < parts.length; i++) {
      this.parts.push([replacement, whitespaceBrush]);
      next(parts[i]);
    }
  }
}
