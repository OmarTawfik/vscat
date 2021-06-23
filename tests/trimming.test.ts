import {highlightDiagnostic} from "../src/highlighting/highlight-diagnostics";
import {highlightDiff} from "../src/highlighting/highlight-diffs";
import {highlightSource} from "../src/highlighting/highlight-source";
import {DiagnosticSeverity} from "../src/options";

it("can trim long lines in sources", async () => {
  const result = await highlightSource({
    source: `
Short line.
A really long line that will definetely exceed the width limit.
Another short line.
`.trim(),
    width: 50,
  });

  expect(result).toMatchInlineSnapshot(`
    Array [
      " 1 │ Short·line.                                  ",
      " 2 │ A·really·long·line·that·will·definetely·exce…",
      " 3 │ Another·short·line.                          ",
    ]
  `);
});

it("can trim long lines in diffs", async () => {
  const result = await highlightDiff({
    beforeSource: `
Short line.
An old long line that will definetely exceed the width limit.
Another short line.
`.trim(),
    afterSource: `
Short line.
A new long line that will definetely exceed the width limit.
Another short line.
`.trim(),
    width: 50,
  });

  expect(result).toMatchInlineSnapshot(`
    Array [
      " 1 │ 1 │ Short·line.                              ",
      " 2 │   │ An·old·long·line·that·will·definetely·ex…",
      "   │ 2 │ A·new·long·line·that·will·definetely·exc…",
      " 3 │ 3 │ Another·short·line.                      ",
    ]
  `);
});

it("can trim long lines in diagnostics", async () => {
  const result = await highlightDiagnostic({
    source: `
Short line.
A really long line that will definetely exceed the width limit.
Another short line.
`.trim(),
    severity: DiagnosticSeverity.Error,
    range: {
      from: {line: 1, column: 9},
      to: {line: 1, column: 18},
    },
    width: 50,
  });

  expect(result).toMatchInlineSnapshot(`
    Array [
      " 1 │ Short·line.                                  ",
      " 2 │ A·really·long·line·that·will·definetely·exce…",
      "   │          ~~~~~~~~~                           ",
      " 3 │ Another·short·line.                          ",
    ]
  `);
});

it("does not print elepsis on lines with maximum width allowed", async () => {
  const result = await highlightSource({
    source: `
4567
45678
456789
`.trim(),
    width: 10,
  });

  expect(result).toMatchInlineSnapshot(`
    Array [
      " 1 │ 4567 ",
      " 2 │ 45678",
      " 3 │ 4567…",
    ]
  `);
});
