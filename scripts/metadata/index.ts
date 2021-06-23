import {pathExists, readdir, readJson, rm, stat} from "fs-extra";
import path from "path";
import {REPO_ROOT} from "../../src/utils";
import {extractLanguages, writeGrammarsFile, writeLanguagesFile} from "./languages";
import {extractThemes, writeThemesFile} from "./themes";
import joi from "types-joi";
import {PACKAGE_SCHEME} from "../utils";

(async () => {
  console.log("Deleting old metadata.");
  await Promise.all([
    rm(path.join(await REPO_ROOT, "metadata", "grammars"), {force: true, recursive: true}),
    rm(path.join(await REPO_ROOT, "metadata", "themes"), {force: true, recursive: true}),
  ]);

  console.log("Collecting available extensions:");
  const extensions = await collectExtensions();

  console.log(`\n\nInspecting ${extensions.length} possible extensions:`);
  for (let i = 0; i < extensions.length; i++) {
    const packagePath = extensions[i];
    console.log(`${(i + 1).toString().padStart(3, " ")} | ${path.relative(await REPO_ROOT, packagePath)}`);

    const packageJson = await readJson(packagePath);
    const packageDir = path.dirname(packagePath);
    const validated = joi.attempt(packageJson, PACKAGE_SCHEME);

    await Promise.all([
      // extraction
      extractThemes(validated, packageDir),
      extractLanguages(validated, packageDir),
    ]);
  }

  await Promise.all([
    // metadata
    writeThemesFile(),
    writeLanguagesFile(),
    writeGrammarsFile(),
  ]);
})();

async function collectExtensions(): Promise<readonly string[]> {
  const extensions: string[] = [];
  await search(path.join(await REPO_ROOT, "vscode"));
  return extensions;

  async function search(currentDir: string): Promise<void> {
    const possiblePackage = path.join(currentDir, "package.json");
    if (await pathExists(possiblePackage)) {
      extensions.push(possiblePackage);
      console.log(
        `${extensions.length.toString().padStart(3, " ")} | ${path.relative(await REPO_ROOT, possiblePackage)}`,
      );
    }

    const children = await readdir(currentDir);
    await Promise.all(
      children.map(async (child) => {
        if (child === "node_modules") {
          return;
        }

        const childDir = path.join(currentDir, child);
        if (!(await stat(childDir)).isDirectory()) {
          return;
        }

        await search(childDir);
      }),
    );
  }
}
