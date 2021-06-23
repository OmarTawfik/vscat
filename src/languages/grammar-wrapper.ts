import * as TextMate from "vscode-textmate";

export interface Token {
  readonly line: number;
  readonly startColumn: number;
  readonly endColumn: number;
  readonly foregroundColor?: string;
}

export class GrammarWrapper {
  public constructor(private readonly rawGrammar: TextMate.IGrammar, private readonly colorMap: string[]) {}

  public tokenizeLines(lines: string[]): Token[][] {
    let state: TextMate.StackElement | null = null;
    return lines.map((line, lineIndex) => {
      const {tokens, nextState} = this.tokenizeSingleLine(line, lineIndex, state);
      state = nextState;
      return tokens;
    });
  }

  private tokenizeSingleLine(
    line: string,
    lineIndex: number,
    previousState: TextMate.StackElement | null,
  ): {
    readonly tokens: Token[];
    readonly nextState: TextMate.StackElement;
  } {
    const {tokens: oldTokens, ruleStack: nextState} = this.rawGrammar.tokenizeLine2(line, previousState);

    const tokensCount = oldTokens.length / 2;
    const newTokens: Token[] = [];

    for (let j = 0; j < tokensCount; j++) {
      const startColumn = oldTokens[2 * j];
      const endColumn = j + 1 < tokensCount ? oldTokens[2 * j + 2] : line.length;

      if (startColumn == endColumn) {
        // Empty recognition
        continue;
      }

      const metadata = oldTokens[2 * j + 1];
      const foregroundColor =
        this.colorMap[
          (metadata & TextMate.MetadataConsts.FOREGROUND_MASK) >>> TextMate.MetadataConsts.FOREGROUND_OFFSET
        ];

      if (foregroundColor !== "#000000") {
        newTokens.push({
          startColumn,
          endColumn,
          line: lineIndex,
          foregroundColor,
        });

        continue;
      }

      let running = "";
      for (let i = startColumn; i < endColumn; i++) {
        const char = line[i];
        if (/ |\t/.test(char)) {
          if (running.length > 0) {
            newTokens.push({
              startColumn: i - running.length,
              endColumn: i,
              line: lineIndex,
            });

            running = "";
          }
        } else {
          running += char;
        }
      }

      if (running.length > 0) {
        newTokens.push({
          startColumn: endColumn - running.length,
          endColumn,
          line: lineIndex,
        });
      }
    }

    return {tokens: newTokens, nextState};
  }
}
