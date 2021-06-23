# vscat (API Guide)

This guide talks about how to use vscat as the NPM package (Javascript/Typescript). To learn about using vscat as a command line utility (npm package), please check the [CLI Guide](./cli.md).

## Importing the package

```bash
# Using Yarn
yarn add vscat

# Using NPM
npm install vscat
```

## Example

```ts
import vscat from "vscat";

const highlightedLines = await vscat.highlightSource({
  source,
  // ...common options
});
```

---

## Common Options

- `width`: line width, where excess characters are trimmed (required).
- `themeIdOrPath`: the ID of a supported theme, or path to a VS Code theme definition (default: `default-high-contrast`).
- `languageIdOrPath`: the ID of a supported language, or path to a TextMate grammar file (default: will try to automatically detect based on VS Code language associations).

## vscat.highlightSource() Options

- `source`: source code to be highlighted.

## vscat.highlightDiff() Options

- `beforeSource`: version A of the source file to be diffed.
- `afterSource`: version B of the source file to be diffed.

## vscat.highlightDiagnostic() Options

- `source`: source code to be highlighted.
- `severity`: One of [`error`, `warning`, `info`, `hint`]
- `range`: source range of the diagnostic to be underlined.

---

## vscat.getSupportedLanguages()

Returns a list of the supported languages by this version.

## vscat.getSupportedThemes()

Returns a list of the supported themes by this version.
