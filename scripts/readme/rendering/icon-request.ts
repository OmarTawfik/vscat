import {mkdirp, pathExists, readFile, writeFile} from "fs-extra";
import path from "path";
import url from "url";
import puppeteer from "puppeteer";
import {readAndCacheFile, REPO_ROOT} from "../../../src/utils";
import {BaseRenderingRequest} from "./requests";

export const ICON_SIZE = 18;

interface SetiIconsFile {
  readonly languageIds: Readonly<Record<string, string>>;
  readonly fileExtensions: Readonly<Record<string, string>>;
  readonly file: string;

  readonly iconDefinitions: Readonly<
    Record<
      string,
      {
        readonly fontCharacter: string;
        readonly fontColor: string;
      }
    >
  >;
}

export class IconRenderingRequest extends BaseRenderingRequest {
  public constructor(private readonly languageId: string) {
    super();
  }

  public async run(imagePath: string): Promise<void> {
    const templateDestination = await this.generateTemplate(imagePath);
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(url.pathToFileURL(templateDestination).toString());
    await page.evaluateHandle("document.fonts.ready");

    const buffer = await page.screenshot({
      clip: {
        x: 0,
        y: 0,
        height: ICON_SIZE,
        width: ICON_SIZE,
      },
      omitBackground: true,
      type: "png",
    });

    if (!Buffer.isBuffer(buffer)) {
      throw new Error("Expected a buffer out of puppeteer.");
    }

    await writeFile(imagePath, buffer);

    await page.close();
    await browser.close();
  }

  private async generateTemplate(imagePath: string): Promise<string> {
    const templatePath = path.join(__dirname, "language-icon-template.html");
    const templateContents = await readFile(templatePath, "utf8");

    const templateDestinationDir = path.join(await REPO_ROOT, "out/icon-templates");
    if (!(await pathExists(templateDestinationDir))) {
      await mkdirp(templateDestinationDir);
    }

    const templateDestination = path.join(templateDestinationDir, path.basename(imagePath, ".png") + ".html");

    const setiFontPath = path.join(await REPO_ROOT, "vscode/extensions/theme-seti/icons/seti.woff");
    const setiIconList = await readAndCacheFile<SetiIconsFile>(
      await REPO_ROOT,
      "vscode/extensions/theme-seti/icons/vs-seti-icon-theme.json",
    );

    const iconShorthand =
      setiIconList.languageIds[this.languageId] || setiIconList.fileExtensions[this.languageId] || setiIconList.file;

    const icon = setiIconList.iconDefinitions[iconShorthand];

    await writeFile(
      templateDestination,
      templateContents
        .replaceAll("__SETI_FONT_PATH__", url.pathToFileURL(setiFontPath).toString())
        .replaceAll("__ICON_SIZE__", `${ICON_SIZE}px`)
        .replaceAll("__ICON_FONT_COLOR__", icon.fontColor)
        .replaceAll("__ICON_FONT_CHARACTER__", icon.fontCharacter),
    );

    return templateDestination;
  }
}
