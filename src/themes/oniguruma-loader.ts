import * as TextMate from "vscode-textmate";

// Using "vscode-oniguruma" is not possible, as it depends on vscode-specific libraries that are not cleanly shared
// Using the original "oniguruma" causes issues with jest module loader, as it overrides symbols imported from the native module.
// Overrides here ./node_modules/oniguruma/src/oniguruma.js
// If the module is loaded twice, the second load fails with "TypeError: Cannot redefine property: length".
// Therefore, we have to implement a better approach to this, by adding the overrides to a child type instead.

const {
  OnigScanner: OriginalOnigScanner,
  OnigString: OriginalOnigString,
} = require("oniguruma/build/Release/onig_scanner.node");

class CustomOnigScanner extends OriginalOnigScanner {
  public constructor(patterns: string[]) {
    super(patterns);
  }

  public findNextMatch(string: string, startPosition: number, callback: Function) {
    if (startPosition == null) startPosition = 0;
    if (typeof startPosition === "function") {
      callback = startPosition;
      startPosition = 0;
    }

    string = this.convertToString(string);
    startPosition = this.convertToNumber(startPosition);

    this._findNextMatch(string, startPosition, (error: Error, match: this) => {
      if (match) match.scanner = this;
      return callback(error, match);
    });
  }

  public findNextMatchSync(string: string, startPosition: number) {
    if (startPosition == null) {
      startPosition = 0;
    }
    string = this.convertToString(string);
    startPosition = this.convertToNumber(startPosition);

    let match = this._findNextMatchSync(string, startPosition);
    if (match) match.scanner = this;
    return match;
  }

  public convertToString(value: string) {
    if (value === undefined) return "undefined";
    if (value === null) return "null";
    if (value.constructor == OnigString) return value;
    return value.toString();
  }

  public convertToNumber(value: any) {
    value = parseInt(value);
    if (!isFinite(value)) {
      value = 0;
    }
    value = Math.max(value, 0);
    return value;
  }
}

class OnigString extends OriginalOnigString {
  public constructor(content: string) {
    super(content);
  }

  public substring(start: number, end: number) {
    return this.content.substring(start, end);
  }

  public toString() {
    return this.content;
  }

  public get length() {
    return this.content.length;
  }
}

export function getOnigLib(): Promise<TextMate.IOnigLib> {
  return Promise.resolve({
    createOnigScanner: (patterns) => new CustomOnigScanner(patterns),
    createOnigString: (content) => new OnigString(content) as any,
  });
}
