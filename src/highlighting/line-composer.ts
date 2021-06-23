import {ELEPSIS, TAB_REPLACEMENT, WHITESPACE_REPLACEMENT} from "./trivia";
import {Brush, ThemeWrapper} from "../themes/theme-wrapper";

export class LineComposer {
  private parts: [string, Brush][] = [];

  public constructor(
    private remainingWidth: number,
    private readonly theme: ThemeWrapper,
    private readonly renderWhitespace = true,
  ) {}

  public append(part: string, brush = this.theme.foreground("editor.foreground")) {
    if (part.length === 0 || this.remainingWidth === 0) {
      // width limit reached. do nothing.
    } else if (part.length <= this.remainingWidth) {
      // whole part can fit.
      this.parts.push([part, brush]);
      this.remainingWidth -= part.length;
    } else {
      // only add the remaining characters and elepsis
      this.parts.push([part.substr(0, this.remainingWidth - ELEPSIS.length), brush]);
      this.parts.push([ELEPSIS, brush]);
      this.remainingWidth = 0;
    }
  }

  public compose(): string {
    const whitespaceBrush = this.theme.foreground("editorWhitespace.foreground");

    const withColor = this.parts.map(([part, brush]) =>
      part
        .split(/ /g)
        .map((atom) =>
          atom
            .split(/\t/g)
            .map((p) => brush(p))
            .join(whitespaceBrush(this.renderWhitespace ? TAB_REPLACEMENT : "\t")),
        )
        .join(whitespaceBrush(this.renderWhitespace ? WHITESPACE_REPLACEMENT : " ")),
    );

    return withColor.join("") + " ".repeat(this.remainingWidth);
  }
}
