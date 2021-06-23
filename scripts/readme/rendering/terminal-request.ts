import {writeFile} from "fs-extra";
import {renderScreenshot} from "terminal-screenshot";
import {getSupportedThemes} from "../../../src/themes/metadata";
import chalk from "chalk";
import {getVariationBackground, getVariationForeground} from "../../utils";
import assert from "assert";
import {BaseRenderingRequest} from "./requests";

export class TerminalRenderingRequest extends BaseRenderingRequest {
  public constructor(
    private readonly themeId: string,
    private readonly factory: () => Promise<string[]>,
    private readonly margin?: number,
    private readonly command?: string,
  ) {
    super();
  }

  public async run(imagePath: string): Promise<void> {
    const themes = await getSupportedThemes();
    const variation = themes.find((t) => t.id === this.themeId)?.variation;
    assert(variation, "Cannot detect variation of theme: " + this.themeId);

    const lines = await this.factory();
    if (this.command) {
      const backgroundBrush = chalk.hex(getVariationForeground(variation));
      lines.splice(0, 0, backgroundBrush(`$ ${this.command}`), backgroundBrush(""));
    }

    const image = await renderScreenshot({
      data: lines.join("\r\n"),
      type: "png",
      backgroundColor: getVariationBackground(variation),
      margin: this.margin,
    });

    await writeFile(imagePath, image);
  }
}
