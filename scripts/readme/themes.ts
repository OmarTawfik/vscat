import {highlightSource} from "../../src";
import {ThemeMetadataFile} from "../../src/themes/metadata";
import {addRequest} from "./rendering/requests";
import {TerminalRenderingRequest} from "./rendering/terminal-request";

const EXAMPLES_WIDTH = 50;
const EXAMPLES_MARGIN = undefined;

export function generateThemesTable(themes: ThemeMetadataFile): string {
  const result: string[] = [
    // table header
    "| ID | Name | Example |",
    "| -- | ---- | --------- |",
  ];

  for (const {id, label, variation} of themes) {
    const key = addRequest(
      new TerminalRenderingRequest(
        id,
        () =>
          highlightSource({
            source: `// This is a ${variation} theme\nexpect(vscat).toBeAwesome();`,
            width: EXAMPLES_WIDTH,
            languageIdOrPath: "typescript",
            themeIdOrPath: id,
          }),
        EXAMPLES_MARGIN,
      ),
    );

    result.push(`| \`${id}\` | ${label} | ![](${key}) |`);
  }

  return result.join("\n");
}
