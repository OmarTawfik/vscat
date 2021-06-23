# vscat (CLI Guide)

This guide talks about how to use vscat as a command line utility (npm package). To learn about using vscat as an API (Javascript/Typescript), please check the [API Guide](./api.md).

## Installation and Usage

### Using Yarn

```bash
yarn add vscat

yarn vscat [...options]
```

### Using NPM

```bash
npm install vscat

npm run vscat [...options]
```

---

## Common Options

- `-t, --theme`: Specifies which VS Code theme to use. Accepts a supported themeId or an explicit theme path. (default: "default-high-contrast")
- `-l, --language`: Specifies the programming language. Accepts a supported languageId or an explicit JSON textmate grammar path. (omit to automatically detect)
- `-w, --width`: Specifies width (in columns) of rendered output. (omit to automatically detect)
- `-h, --help`: display usage help.

## vscat [source-file]

Highlights a single source file.

![0-0](https://user-images.githubusercontent.com/15987992/124856627-b5ce1080-df5f-11eb-8dac-83f70c86c510.png)

## vscat diff [before-file] [after-file]

Highlights difference between two files.

![1-0](https://user-images.githubusercontent.com/15987992/124856628-b666a700-df5f-11eb-8463-f0bc38815b0d.png)

## vscat diagnostics [source-file]

Highlights a single source file with a diagnostic range.

- `--from <line,column>`: Starting position of the diagnostic.
- `--to <line,column>` : Ending position of the diagnostic.
- `--severity <severity>`: Supports 'error', 'warning', 'info', and 'hint'. (default: "error")

![2-0](https://user-images.githubusercontent.com/15987992/124856629-b666a700-df5f-11eb-90a4-321c7dddd9de.png)

## vscat list-themes

Lists all themes supported by this version.

## vscat list-languages

Lists all languages supported by this version.
