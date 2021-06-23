import {highlightDiff} from "../src/highlighting/highlight-diffs";
import {splitLines} from "../src/highlighting/trivia";

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

There are many variations of passages of Lorem Ipsum available,
but the majority have suffered alteration in some form, by injected humour,
or randomised words which don't look even slightly believable.
If you are going to use a passage of Lorem Ipsum, you need to be sure there is not anything embarrassing hidden in the middle of text.
All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,
making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words,
combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.
The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
`.trim();

it("shows only specified context lines", async () => {
  const lines = splitLines(PARAGRAPH);
  lines.splice(12, 1);
  lines.splice(4, 1);

  const result = await highlightDiff({
    beforeSource: PARAGRAPH,
    afterSource: lines.join("\n"),
    width: 80,
  });

  expect(result).toMatchInlineSnapshot(`
    Array [
      "    ╿    ╿                                                                      ",
      "  3 │  3 │ Richard·McClintock,·a·Latin·professor·at·Hampden-Sydney·College·in·V…",
      "  4 │  4 │ looked·up·one·of·the·more·obscure·Latin·words,·consectetur,·from·a·L…",
      "  5 │    │ and·going·through·the·cites·of·the·word·in·classical·literature,·dis…",
      "  6 │  5 │ Lorem·Ipsum·comes·from·sections·1.10.32·and·1.10.33·of·de·Finibus·Bo…",
      "  7 │  6 │ (The·Extremes·of·Good·and·Evil)·by·Cicero,·written·in·45·BC.·This·bo…",
      "    ╽    ╽                                                                      ",
      "    ╿    ╿                                                                      ",
      " 11 │ 10 │ There·are·many·variations·of·passages·of·Lorem·Ipsum·available,      ",
      " 12 │ 11 │ but·the·majority·have·suffered·alteration·in·some·form,·by·injected·…",
      " 13 │    │ or·randomised·words·which·don't·look·even·slightly·believable.       ",
      " 14 │ 12 │ If·you·are·going·to·use·a·passage·of·Lorem·Ipsum,·you·need·to·be·sur…",
      " 15 │ 13 │ All·the·Lorem·Ipsum·generators·on·the·Internet·tend·to·repeat·predef…",
      "    ╽    ╽                                                                      ",
    ]
  `);
});

it("produces no output on identical values", async () => {
  const result = await highlightDiff({
    beforeSource: PARAGRAPH,
    afterSource: PARAGRAPH,
    width: 80,
  });

  expect(result).toMatchInlineSnapshot(`Array []`);
});
