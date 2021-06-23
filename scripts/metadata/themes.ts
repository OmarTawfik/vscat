import path from "path";
import {ThemeMetadata, ThemeVariation} from "../../src/themes/metadata";
import assert from "assert";
import {PACKAGE_SCHEME, writeFormattedJSON} from "../utils";
import {REPO_ROOT} from "../../src/utils";
import {resolveTheme} from "../../src/themes/theme-resolver";
import {InterfaceFrom} from "types-joi";

const THEMES: ThemeMetadata[] = [];

export async function extractThemes(contents: InterfaceFrom<typeof PACKAGE_SCHEME>, packageDir: string): Promise<void> {
  for (const {id: label, uiTheme, path: themeRelativePath} of contents.contributes?.themes || []) {
    const id = label.replace(/[+]/g, "-plus").replace(/[\s]/g, "-").toLowerCase();
    const variation = extractVariation(uiTheme);

    assert(
      THEMES.every((t) => t.id !== id),
      "Duplicate definitions of theme: " + id,
    );

    THEMES.push({id, label, variation});

    const themeFullPath = path.join(packageDir, themeRelativePath);
    const themeContents = await resolveTheme(themeFullPath, variation);
    const themeDestination = path.join(await REPO_ROOT, "metadata", "themes", id + ".json");
    await writeFormattedJSON(themeDestination, themeContents as {});

    console.log(`    | 🖌 ${id}`);
  }
}

export async function writeThemesFile(): Promise<void> {
  THEMES.sort((a, b) => {
    if (a.variation !== b.variation) {
      return a.variation.localeCompare(b.variation);
    }

    return a.id.localeCompare(b.id);
  });

  const destination = path.join(await REPO_ROOT, "metadata", "themes.json");
  await writeFormattedJSON(destination, THEMES);
}

function extractVariation(uiTheme: string): ThemeVariation {
  switch (uiTheme) {
    case "vs":
      return ThemeVariation.Light;
    case "vs-dark":
      return ThemeVariation.Dark;
    case "hc-black":
      return ThemeVariation.HighContrast;
    default:
      throw new Error("Unrecognized uiTheme: " + uiTheme);
  }
}
