import {writeFile} from "fs-extra";
import path from "path";
import prettier from "prettier";
import {getSupportedThemes} from "../../src/themes/metadata";
import {REPO_ROOT} from "../../src/utils";
import {flushRequests} from "./rendering/requests";
import {generateDiagnosticsTable, generateDiffTable, generateSourceTable} from "./features";
import {generateThemesTable} from "./themes";
import {getSupportedLanguages} from "../../src/languages/metadata";
import {generateLanguagesTable} from "./languages";

(async () => {
  console.log("Regenerating README.");

  const contents = await generateREADME();
  const flushedContents = await flushRequests(contents);

  const filePath = path.join(await REPO_ROOT, "README.md");
  const formatted = prettier.format(flushedContents, {
    filepath: filePath,
  });

  await writeFile(filePath, formatted);
})();

async function generateREADME(): Promise<string> {
  const [themes, languages] = await Promise.all([getSupportedThemes(), getSupportedLanguages()]);

  return `# vscat

Bringing VS Code syntax highlighting to the terminal!

- [User Guide (API)](./docs/user-guide/api.md)
- [User Guide (CLI)](./docs/user-guide/cli.md)
- [NPM Package](https://npmjs.com/package/vscat)

## Why?

VS Code has developed phenomenally over the last few years, making it the de facto code editor for millions of developers. With extensive styling and theming, developers quickly became comfortable with its syntax highlighting. Having consistent highlighting means:

1. Improved code readability.
2. Easier and faster code reviews.
3. Consistent and clear diagnostic messages.

Unfortunatelly, this did not translate to CLI tools that the same developers use. This library aims to bridge the gap by bringing VS Code grammars and themes to the terminal. We hope that major build tools, apis, and linters can adopt it to provide a consistent experience accross all surfaces.

## Features

${generateSourceTable()}

${generateDiffTable()}

${generateDiagnosticsTable()}

## ${Object.keys(languages).length} Available languages

We support all built in VS Code languages. You can also pass the explicit path to a text mate grammar file if you would like to use a custom language. By default, we try to automatically detect the file's language based on VS Code's file detection rules.

${await generateLanguagesTable(languages)}

## ${themes.length} Available Themes

We support all built in VS Code themes. You can also pass the explicit path to a custom theme file if you would like to use a custom theme.

${generateThemesTable(themes)}

## Roadmap

We released the first version of this library to gauge interest and asses further investment areas. Please [open an issue](https://github.com/OmarTawfik/vscat/issues) to give feedback on your use-case, or how can this library serve you better. Here are some of the features on our roadmap:

- Supporting nested languages ([#2](https://github.com/OmarTawfik/vscat/issues/2))
- Supporting advanced decorators, like underlines, background colors ([#3](https://github.com/OmarTawfik/vscat/issues/3))
- Supporting diffing individual characters in diff view ([#4](https://github.com/OmarTawfik/vscat/issues/4))

## Testing

You can write automated tests for the output of this library, either by taking snapshots and comparing the raw ANSI output, or by combining this with a library like [terminal-screenshot](https://github.com/OmarTawfik/terminal-screenshot). This library uses [XTerm.js](https://www.npmjs.com/package/xterm) to render real terminal output, and saves a screenshot as an image. You can also combine it with [jest-image-snapshot](https://www.npmjs.com/package/jest-image-snapshot) to persist and diff these images using Jest.

\`\`\`ts
import vscat from "vscat";
import {renderScreenshot} from "terminal-screenshot";

it("can highlight source code", async () => {
  const output = await vscat.highlightSource({sourceCode, ...});
  const image = await renderScreenshot({output, ...});

  expect(image).toMatchImageSnapshot();
});
\`\`\`

## Help and Support

Please use [GitHub Issues](https://github.com/OmarTawfik/vscat/issues) to report any issues, or ask questions.
`;
}
