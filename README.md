# vscat

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

### Highlighting Source Files

<table>
  <tr>
    <td>📄 <code>typescript</code> 🖌 <code>default-dark-plus</code></td>
    <td>📄 <code>cpp</code> 🖌 <code>default-light-plus</code></td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/15987992/126025741-d9780625-638e-4bcc-80bd-a20f5f5d3324.png" /></td>
    <td><img src="https://user-images.githubusercontent.com/15987992/126025742-aea70639-e875-42db-9a7e-343961ebb5ac.png" /></td>
  </tr>
  <tr>
    <td>📄 <code>json</code> 🖌 <code>abyss</code></td>
    <td>📄 <code>python</code> 🖌 <code>default-high-contrast</code></td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/15987992/126025743-a0a06220-34c7-4a05-9333-34305f47657e.png" /></td>
    <td><img src="https://user-images.githubusercontent.com/15987992/126025744-19018e19-314e-49d6-9b74-11f1c93074f3.png" /></td>
  </tr>
</table>

### Highlighting Diffs and Patches

<table>
  <tr>
    <td>📄 <code>html</code> 🖌 <code>default-dark-plus</code></td>
    <td>📄 <code>python</code> 🖌 <code>tomorrow-night-blue</code></td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/15987992/126025745-e65964d8-0684-4ffb-840e-e8d95b2775c3.png" /></td>
    <td><img src="https://user-images.githubusercontent.com/15987992/126025746-05a95519-9cf7-4ae5-9399-063989667d51.png" /></td>
  </tr>
</table>

### Highlighting Diagnostics

<table>
  <tr>
    <td>📄 <code>javascriptreact</code> 🖌 <code>default-high-contrast</code></td>
    <td>📄 <code>javascriptreact</code> 🖌 <code>default-high-contrast</code></td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/15987992/126025747-e9d80b42-20f3-41d4-b5b1-a0f75c979a07.png" /></td>
    <td><img src="https://user-images.githubusercontent.com/15987992/126025748-70c3a8e3-0fba-462f-aff3-36a6505e59a1.png" /></td>
  </tr>
  <tr>
    <td>📄 <code>javascriptreact</code> 🖌 <code>default-high-contrast</code></td>
    <td>📄 <code>javascriptreact</code> 🖌 <code>default-high-contrast</code></td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/15987992/126025749-8b04f573-944e-4a94-9fea-6f42431e3c8d.png" /></td>
    <td><img src="https://user-images.githubusercontent.com/15987992/126025750-78403a5e-354f-4a46-89b0-62b1a9be6c20.png" /></td>
  </tr>
</table>

## 57 Available languages

We support all built in VS Code languages. You can also pass the explicit path to a text mate grammar file if you would like to use a custom language. By default, we try to automatically detect the file's language based on VS Code's file detection rules.

<table>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025751-c433e388-b208-4b6f-aaf9-34434911b458.png" height="18" width="18" />
      <span>  </span>
      <code>bat</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025752-389faf4e-0f32-4f51-a8b0-bbfa7fa7fbf2.png" height="18" width="18" />
      <span>  </span>
      <code>c</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025753-51d2a022-0326-4ef5-aa6c-fdb947a4df45.png" height="18" width="18" />
      <span>  </span>
      <code>clojure</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025754-2000a54b-d913-4c17-a7da-8aca02ba1212.png" height="18" width="18" />
      <span>  </span>
      <code>coffeescript</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025756-3ee251ae-c7b4-413d-a8f5-9b71b411f340.png" height="18" width="18" />
      <span>  </span>
      <code>cpp</code>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025757-ef9ef03f-515d-4a28-8030-85d4ebac9571.png" height="18" width="18" />
      <span>  </span>
      <code>csharp</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025758-ea6808c7-bad7-49df-a22a-a0ff0d144dd4.png" height="18" width="18" />
      <span>  </span>
      <code>css</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025759-e69a8db2-69a5-46ba-9df3-06511aeebf3d.png" height="18" width="18" />
      <span>  </span>
      <code>cuda-cpp</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025760-bf859335-b124-4a17-9594-7a4051846ae9.png" height="18" width="18" />
      <span>  </span>
      <code>dart</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025762-c5968efd-c14b-46ca-8c58-7602a976f8ea.png" height="18" width="18" />
      <span>  </span>
      <code>diff</code>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025763-df07cc2b-91b5-4d8c-b56e-c15d15132115.png" height="18" width="18" />
      <span>  </span>
      <code>dockercompose</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025764-cbb98a32-e935-488b-a8ef-b4f47fce2ae4.png" height="18" width="18" />
      <span>  </span>
      <code>dockerfile</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025765-53bdb5fb-0031-4e1c-b17f-0742e905aa2d.png" height="18" width="18" />
      <span>  </span>
      <code>fsharp</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025766-1c7928c2-a8a4-4148-9bf0-449a9b824e71.png" height="18" width="18" />
      <span>  </span>
      <code>git-commit</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025767-f71027ab-cbf5-47a1-ad32-3d24d44f4808.png" height="18" width="18" />
      <span>  </span>
      <code>git-rebase</code>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025768-126c4118-5b2f-4773-944f-9339cd5de92e.png" height="18" width="18" />
      <span>  </span>
      <code>go</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025769-5e94afbe-ec2c-4ebc-a2e3-c187f37a0dbd.png" height="18" width="18" />
      <span>  </span>
      <code>groovy</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025770-aa689666-0e24-4417-869d-f5ef2ab4c009.png" height="18" width="18" />
      <span>  </span>
      <code>handlebars</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025771-558935f5-f0a2-47fc-983e-5265d69c5475.png" height="18" width="18" />
      <span>  </span>
      <code>hlsl</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025772-a6b86a0f-99f8-4a7f-b976-c2f2d34b2e8e.png" height="18" width="18" />
      <span>  </span>
      <code>html</code>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025773-c86ffd23-c9ef-4db3-a1a1-5dd5cf0e52a7.png" height="18" width="18" />
      <span>  </span>
      <code>ignore</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025774-4069dcbb-237f-4cc5-a0f0-f47e8d7d3128.png" height="18" width="18" />
      <span>  </span>
      <code>ini</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025775-20b0cbe9-d0cf-4483-9e2c-d440189f8d51.png" height="18" width="18" />
      <span>  </span>
      <code>jade</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025776-9c0421ad-89cc-40e1-ae72-0cec1db475fa.png" height="18" width="18" />
      <span>  </span>
      <code>java</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025777-ab6e125f-64a5-4889-accf-79120ea519b2.png" height="18" width="18" />
      <span>  </span>
      <code>javascript</code>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025779-c854424a-25f4-4553-862a-c7d42c9a4127.png" height="18" width="18" />
      <span>  </span>
      <code>javascriptreact</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025780-07699cc2-558f-40f1-8f5e-4b11f86a42ea.png" height="18" width="18" />
      <span>  </span>
      <code>json</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025781-fd89b264-c59d-465e-a888-800a9f516a43.png" height="18" width="18" />
      <span>  </span>
      <code>jsonc</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025782-69978a92-3b81-4def-a72c-0d43fb900e49.png" height="18" width="18" />
      <span>  </span>
      <code>julia</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025783-d222b282-58bc-42f9-9b60-05e019ed047d.png" height="18" width="18" />
      <span>  </span>
      <code>less</code>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025784-780f2962-b673-47ee-af95-8305d5187809.png" height="18" width="18" />
      <span>  </span>
      <code>log</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025785-fd7d854c-12c6-44e7-b9db-1c868056c591.png" height="18" width="18" />
      <span>  </span>
      <code>lua</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025786-2b5bbe02-d758-4a69-afb7-b13f43ea8bf4.png" height="18" width="18" />
      <span>  </span>
      <code>makefile</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025787-d6460e9b-b390-4cad-8a30-35387293d633.png" height="18" width="18" />
      <span>  </span>
      <code>markdown</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025788-c2c2b474-caa8-4363-9ccc-91e98407d828.png" height="18" width="18" />
      <span>  </span>
      <code>objective-c</code>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025789-393bf625-ffa4-460a-9787-48191e9bb54e.png" height="18" width="18" />
      <span>  </span>
      <code>objective-cpp</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025790-21245f6d-b5da-4001-bd09-5ce295dc03c3.png" height="18" width="18" />
      <span>  </span>
      <code>perl</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025791-0274f7ee-264f-4121-8427-0fe02a1e62c2.png" height="18" width="18" />
      <span>  </span>
      <code>perl6</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025792-87273255-39ac-46d4-bd0e-f246bb79db15.png" height="18" width="18" />
      <span>  </span>
      <code>php</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025793-5c88f1bb-bb5b-40e3-ae74-2bac1c6e8259.png" height="18" width="18" />
      <span>  </span>
      <code>powershell</code>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025794-9634ca36-e9f3-427e-bb71-f44c02df1107.png" height="18" width="18" />
      <span>  </span>
      <code>properties</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025796-c9e4d3f8-277b-46cd-8147-73d3e475af3e.png" height="18" width="18" />
      <span>  </span>
      <code>python</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025797-41b59549-b1dc-4cd2-8bb3-3629222ba5b7.png" height="18" width="18" />
      <span>  </span>
      <code>r</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025798-5c58ee0d-92f0-443d-9556-2a55cffccacb.png" height="18" width="18" />
      <span>  </span>
      <code>razor</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025799-4dc39a98-0530-47a2-aab0-e4b6ebb32dc4.png" height="18" width="18" />
      <span>  </span>
      <code>ruby</code>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025800-49fdee6e-51c9-47d6-9d7b-7bd808de04d1.png" height="18" width="18" />
      <span>  </span>
      <code>rust</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025801-8d177a9c-a61e-40a0-87be-875193588b9c.png" height="18" width="18" />
      <span>  </span>
      <code>scss</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025802-874fa383-bce0-4a5c-b8da-3e9f7e3bace8.png" height="18" width="18" />
      <span>  </span>
      <code>shaderlab</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025803-9d8f159b-26f4-42b7-8e45-be64ba29b5ba.png" height="18" width="18" />
      <span>  </span>
      <code>shellscript</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025804-38cf5033-adcb-4df1-a4e9-e6eaca213905.png" height="18" width="18" />
      <span>  </span>
      <code>sql</code>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025805-a0e0b1ce-42fd-4a10-b8e6-d581714264e8.png" height="18" width="18" />
      <span>  </span>
      <code>swift</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025806-f44a110e-97e7-41bb-9df0-7a5a516b323b.png" height="18" width="18" />
      <span>  </span>
      <code>typescript</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025807-ab914535-d031-4dbc-8428-3353baa571fe.png" height="18" width="18" />
      <span>  </span>
      <code>typescriptreact</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025808-a8da9377-b116-4aad-ba7a-88371401186b.png" height="18" width="18" />
      <span>  </span>
      <code>vb</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025809-838a5f3a-c923-40a2-861d-21998974612e.png" height="18" width="18" />
      <span>  </span>
      <code>xml</code>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025810-8d3b70aa-3513-4a62-9b3c-1b6a703ace1b.png" height="18" width="18" />
      <span>  </span>
      <code>xsl</code>
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/15987992/126025811-f03128f7-41bc-4f09-85ea-1fd188ce44ce.png" height="18" width="18" />
      <span>  </span>
      <code>yaml</code>
    </td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

## 14 Available Themes

We support all built in VS Code themes. You can also pass the explicit path to a custom theme file if you would like to use a custom theme.

| ID                      | Name                  | Example                                                                                                    |
| ----------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------- |
| `abyss`                 | Abyss                 | ![](https://user-images.githubusercontent.com/15987992/126025812-13aa364f-bc2c-43cf-9691-270480e746ea.png) |
| `default-dark-plus`     | Default Dark+         | ![](https://user-images.githubusercontent.com/15987992/126025813-b5081ec1-96d3-4713-834a-7b529b21e07a.png) |
| `kimbie-dark`           | Kimbie Dark           | ![](https://user-images.githubusercontent.com/15987992/126025814-3054101d-4ecc-4272-9056-5cf48f5d7647.png) |
| `monokai`               | Monokai               | ![](https://user-images.githubusercontent.com/15987992/126025815-d1ebcf6e-4523-4865-b265-161c14efe3f5.png) |
| `monokai-dimmed`        | Monokai Dimmed        | ![](https://user-images.githubusercontent.com/15987992/126025816-c0aba24c-c5b8-4796-aa21-7025fdbf00ea.png) |
| `red`                   | Red                   | ![](https://user-images.githubusercontent.com/15987992/126025817-e1f67070-8332-472f-bc84-7fae438374d4.png) |
| `solarized-dark`        | Solarized Dark        | ![](https://user-images.githubusercontent.com/15987992/126025818-1f603b6a-d777-4b8d-a8fa-3cc18c690215.png) |
| `tomorrow-night-blue`   | Tomorrow Night Blue   | ![](https://user-images.githubusercontent.com/15987992/126025820-8c9af8ff-9eda-4c0b-bb35-aff2032f69d8.png) |
| `visual-studio-dark`    | Visual Studio Dark    | ![](https://user-images.githubusercontent.com/15987992/126025821-54771c6b-b03a-4bb1-914b-581740af1d65.png) |
| `default-high-contrast` | Default High Contrast | ![](https://user-images.githubusercontent.com/15987992/126025822-ad99510b-40fd-4995-8ce5-67a50bb4cee8.png) |
| `default-light-plus`    | Default Light+        | ![](https://user-images.githubusercontent.com/15987992/126025823-2539e157-f6a6-4d67-b322-6e1892a0cd4a.png) |
| `quiet-light`           | Quiet Light           | ![](https://user-images.githubusercontent.com/15987992/126025824-6ab47d51-f0a9-4e62-b904-43c89bba059e.png) |
| `solarized-light`       | Solarized Light       | ![](https://user-images.githubusercontent.com/15987992/126025825-5cf2067f-bcf9-495c-9ec0-f678e9bd9345.png) |
| `visual-studio-light`   | Visual Studio Light   | ![](https://user-images.githubusercontent.com/15987992/126025826-efc53db9-fbfa-4f2b-a992-105572a6fc23.png) |

## Roadmap

We released the first version of this library to gauge interest and asses further investment areas. Please [open an issue](https://github.com/OmarTawfik/vscat/issues) to give feedback on your use-case, or how can this library serve you better. Here are some of the features on our roadmap:

- Supporting nested languages ([#2](https://github.com/OmarTawfik/vscat/issues/2))
- Supporting advanced decorators, like underlines, background colors ([#3](https://github.com/OmarTawfik/vscat/issues/3))
- Supporting diffing individual characters in diff view ([#4](https://github.com/OmarTawfik/vscat/issues/4))

## Testing

You can write automated tests for the output of this library, either by taking snapshots and comparing the raw ANSI output, or by combining this with a library like [terminal-screenshot](https://github.com/OmarTawfik/terminal-screenshot). This library uses [XTerm.js](https://www.npmjs.com/package/xterm) to render real terminal output, and saves a screenshot as an image. You can also combine it with [jest-image-snapshot](https://www.npmjs.com/package/jest-image-snapshot) to persist and diff these images using Jest.

```ts
import vscat from "vscat";
import {renderScreenshot} from "terminal-screenshot";

it("can highlight source code", async () => {
  const output = await vscat.highlightSource({sourceCode, ...});
  const image = await renderScreenshot({output, ...});

  expect(image).toMatchImageSnapshot();
});
```

## Help and Support

Please use [GitHub Issues](https://github.com/OmarTawfik/vscat/issues) to report any issues, or ask questions.
