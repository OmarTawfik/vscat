import {mkdirp, writeFile} from "fs-extra";
import prettier from "prettier";
import assert from "assert";
import joi from "types-joi";
import path from "path";
import {ThemeVariation} from "../src/themes/metadata";

export const PACKAGE_SCHEME = joi
  .object({
    contributes: joi
      .object({
        themes: joi.array().items(
          joi.object({
            id: joi.string().required(),
            uiTheme: joi.string().required(),
            label: joi.string(),
            path: joi
              .string()
              .required()
              .regex(/\.json$/),
          }),
        ),
        languages: joi.array().items(
          joi.object({
            id: joi.string().required(),
            extensions: joi.array().items(joi.string()),
            filenames: joi.array().items(joi.string()),
            aliases: joi.array().items(joi.string()),
            mimetypes: joi.array().items(joi.string()),
            filenamePatterns: joi.array().items(joi.string()),
            configuration: joi.string(),
            firstLine: joi.string(),
          }),
        ),
        grammars: joi.array().items(
          joi.object({
            language: joi.string(),
            scopeName: joi.string().required(),
            path: joi.string().required(),
            embeddedLanguages: joi.object(),
            tokenTypes: joi.object(),
            injectTo: joi.array().items(joi.string()),
          }),
        ),
      })
      .unknown(true),
  })
  .required()
  .unknown(true);

export async function writeFormattedJSON(destination: string, contents: unknown): Promise<void> {
  const config = await prettier.resolveConfig(destination);

  assert(config, "prettier config must be present.");
  const formatted = prettier.format(JSON.stringify(contents), {
    ...config,
    filepath: destination,
  });

  await mkdirp(path.dirname(destination));
  await writeFile(destination, formatted);
}

export function getVariationBackground(variation: ThemeVariation): string {
  switch (variation) {
    case ThemeVariation.Dark:
    case ThemeVariation.HighContrast:
      return "#000000";
    case ThemeVariation.Light:
      return "#FFFFFF";
  }
}

export function getVariationForeground(variation: ThemeVariation): string {
  switch (variation) {
    case ThemeVariation.Dark:
    case ThemeVariation.HighContrast:
      return "#FFFFFF";
    case ThemeVariation.Light:
      return "#000000";
  }
}
