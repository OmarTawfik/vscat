import {highlightDiagnostic} from "../src/highlighting/highlight-diagnostics";
import {DiagnosticSeverity} from "../src/options";

const PARAGRAPH = `
Contrary to popular belief, Lorem Ipsum is not simply random text.
It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
and going through the cites of the word in classical literature, discovered the undoubtable source.
Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum
(The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics,
very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet..,
comes from a line in section 1.10.32.
`.trim();

it("can highlight multi-line diagnostics", async () => {
  const result = await highlightDiagnostic({
    source: PARAGRAPH,
    severity: DiagnosticSeverity.Error,
    range: {
      from: {line: 3, column: 21},
      to: {line: 6, column: 50},
    },
    width: 80,
  });

  expect(result).toMatchInlineSnapshot(`
    Array [
      "  2 │ It·has·roots·in·a·piece·of·classical·Latin·literature·from·45·BC,·making·…",
      "  3 │ Richard·McClintock,·a·Latin·professor·at·Hampden-Sydney·College·in·Virgin…",
      "  4 │ looked·up·one·of·the·more·obscure·Latin·words,·consectetur,·from·a·Lorem·…",
      "    │                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~…",
      "  5 │ and·going·through·the·cites·of·the·word·in·classical·literature,·discover…",
      "    │ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~…",
      "  6 │ Lorem·Ipsum·comes·from·sections·1.10.32·and·1.10.33·of·de·Finibus·Bonorum…",
      "    │ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~…",
      "  7 │ (The·Extremes·of·Good·and·Evil)·by·Cicero,·written·in·45·BC.·This·book·is…",
      "    │ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                        ",
      "  8 │ very·popular·during·the·Renaissance.·The·first·line·of·Lorem·Ipsum,·Lorem…",
      "  9 │ comes·from·a·line·in·section·1.10.32.                                     ",
    ]
  `);
});

it("shows only specified context lines", async () => {
  const result = await highlightDiagnostic({
    source: PARAGRAPH,
    severity: DiagnosticSeverity.Error,
    range: {
      from: {line: 4, column: 22},
      to: {line: 4, column: 63},
    },
    width: 80,
  });

  expect(result).toMatchInlineSnapshot(`
    Array [
      "  3 │ Richard·McClintock,·a·Latin·professor·at·Hampden-Sydney·College·in·Virgin…",
      "  4 │ looked·up·one·of·the·more·obscure·Latin·words,·consectetur,·from·a·Lorem·…",
      "  5 │ and·going·through·the·cites·of·the·word·in·classical·literature,·discover…",
      "    │                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~           ",
      "  6 │ Lorem·Ipsum·comes·from·sections·1.10.32·and·1.10.33·of·de·Finibus·Bonorum…",
      "  7 │ (The·Extremes·of·Good·and·Evil)·by·Cicero,·written·in·45·BC.·This·book·is…",
    ]
  `);
});
