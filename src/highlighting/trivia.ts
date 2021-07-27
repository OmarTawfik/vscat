export const ELEPSIS = "…";
export const SQUIGGLY_MARKER = "~";

export const SPACE_REPLACEMENT = "·";
export const TAB_REPLACEMENT = "→   ";

export const MARGIN_UP = " ╿ ";
export const MARGIN_MIDDLE = " │ ";
export const MARGIN_DOWN = " ╽ ";

export const CONTEXT_LINES = 2;

export const splitLines = (source: string) => source.split(/\r?\n/);

export const calculateMarginWidth = (source: string, addedLines = 0) =>
  (splitLines(source).length + addedLines).toString().length;
