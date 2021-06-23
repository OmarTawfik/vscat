import assert from "assert";
import {highlightDiagnostic, highlightDiff, highlightSource} from "../../src";
import {BaseHighlightOptions, DiagnosticSeverity} from "../../src/options";
import {addRequest} from "./rendering/requests";
import {TerminalRenderingRequest} from "./rendering/terminal-request";

const TABLE_COLUMNS = 2;
const EXAMPLES_WIDTH = 50;
const EXAMPLES_MARGIN = 5;

export function generateSourceTable(): string {
  return generateFeatureTable({
    title: "Highlighting Source Files",
    command: "vscat source-file [...options]",
    factory: highlightSource,
    examples: [
      {
        source: `interface User {
  id: number;
}

const user: User = {
  id: 0,
};`,
        width: EXAMPLES_WIDTH,
        languageIdOrPath: "typescript",
        themeIdOrPath: "default-dark-plus",
      },
      {
        source: `void main() {
  int n1, n2;
  cout << "Enter two positive integers: ";
  cin >> n1 >> n2;

  cout << "Their sum is: " << n1 + n2;
}`,
        width: EXAMPLES_WIDTH,
        languageIdOrPath: "cpp",
        themeIdOrPath: "default-light-plus",
      },
      {
        source: `{
  "name": "vscat",
  "description": "Bringing VS Code syntax highlighting to the terminal!",
  "repository": "https://github.com/OmarTawfik/vscat",
  "version": "0.0.0",
  "private": false,
}`,
        width: EXAMPLES_WIDTH,
        languageIdOrPath: "json",
        themeIdOrPath: "abyss",
      },
      {
        source: `# Python3 program to add two numbers

number1 = input("First number: ")
number2 = input("\\nSecond number: ")

# Print result:
print("The sum of {0} and {1} is {2}".format(number1, number2, float(number1) + float(number2)))`,
        width: EXAMPLES_WIDTH,
        languageIdOrPath: "python",
        themeIdOrPath: "default-high-contrast",
      },
    ],
  });
}

export function generateDiffTable(): string {
  return generateFeatureTable({
    title: "Highlighting Diffs and Patches",
    command: "vscat diff before-file after-file [...options]",
    factory: highlightDiff,
    examples: [
      {
        beforeSource: `<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
  </body>
</html>`,
        afterSource: `<html>
  <head>
    <title>Page Title</title>
  </head>
  <body color="#afafaf">
    <h1>Note:</h1>
    <p>This webpage has some color now.</p>
  </body>
</html>`,
        width: EXAMPLES_WIDTH,
        languageIdOrPath: "html",
        themeIdOrPath: "default-dark-plus",
      },
      {
        beforeSource: `def Fibonacci(n):
if n<= 0:
    print("Incorrect input")
elif n == 1:
elif n == 2:
    return 0
else:
    return Fibonacci(n-1) + Fibonacci(n-2)`,
        afterSource: `def Fibonacci(n):
if n<= 0:
    print("Incorrect input")
elif n == 1:
    return 0
elif n == 2:
    return 1
else:
    return Fibonacci(n-1) + Fibonacci(n-2)`,
        width: EXAMPLES_WIDTH,
        languageIdOrPath: "python",
        themeIdOrPath: "tomorrow-night-blue",
      },
    ],
  });
}

export function generateDiagnosticsTable(): string {
  return generateFeatureTable({
    title: "Highlighting Diagnostics",
    command: "vscat diagnostics source-file [...options]",
    factory: highlightDiagnostic,
    examples: Object.values(DiagnosticSeverity).map((severity) => ({
      source: `function render() {
  const styles = {
    position: 'relative',
    height: '100%',
    width: '100%',
    display: 'table-cell',
  };

  return (
    <div foo="bar">
      <span>Severity: ${severity}</span>
    </div>
  );
}`,
      width: EXAMPLES_WIDTH,
      languageIdOrPath: "javascriptreact",
      themeIdOrPath: "default-high-contrast",
      severity,
      range: {
        from: {line: 9, column: 9},
        to: {line: 9, column: 12},
      },
    })),
  });
}

interface FeatureDescription<TOptions extends BaseHighlightOptions> {
  readonly title: string;
  readonly command: string;
  readonly factory: (options: TOptions) => Promise<string[]>;
  readonly examples: readonly TOptions[];
}

function generateFeatureTable<TOptions extends BaseHighlightOptions>(feature: FeatureDescription<TOptions>): string {
  const result: string[] = [];

  result.push(`### ${feature.title}`);
  result.push("");
  result.push("<table>");

  const examples = [...feature.examples];
  while (examples.length > 0) {
    const row: (TOptions | null)[] = examples.splice(0, TABLE_COLUMNS);
    while (row.length < TABLE_COLUMNS) {
      row.push(null);
    }

    result.push("  <tr>");
    for (const options of row) {
      if (options) {
        result.push(`    <td>📄 <code>${options.languageIdOrPath}</code> 🖌 <code>${options.themeIdOrPath}</code></td>`);
      } else {
        result.push("    <td></td>");
      }
    }
    result.push("  </tr>");

    result.push("  <tr>");
    for (const options of row) {
      if (options) {
        assert(options.themeIdOrPath);
        const key = addRequest(
          new TerminalRenderingRequest(
            options.themeIdOrPath,
            () => feature.factory(options),
            EXAMPLES_MARGIN,
            feature.command,
          ),
        );

        result.push(`    <td><img src="${key}" /></td>`);
      } else {
        result.push("    <td></td>");
      }
    }
    result.push("  </tr>");
  }

  result.push("</table>");
  return result.join("\n");
}
