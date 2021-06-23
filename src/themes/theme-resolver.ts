import assert from "assert";
import {readFile} from "fs-extra";
import * as JSONC from "jsonc-parser";
import path from "path";
import {IRawThemeSetting} from "vscode-textmate";
import {REPO_ROOT} from "../utils";
import {KnownColor, ResolvedTheme, ThemeVariation} from "./metadata";

export async function resolveTheme(themePath: string, variation: ThemeVariation): Promise<ResolvedTheme> {
  const theme = await parseIncludeChain(themePath, variation);
  const approximation = getAlphaApproximation(variation);
  const correctColor = (key: KnownColor) => correctAlpha(approximation, theme.colors[key]);

  return {
    colors: Object.keys(theme.colors).reduce((acc, key) => {
      acc[key as KnownColor] = correctColor(key as KnownColor);
      return acc;
    }, {} as Record<KnownColor, string>),
    settings: theme.settings.map(({scope, settings: {foreground, background, fontStyle}}) => ({
      scope,
      settings: {
        foreground: foreground ? correctAlpha(approximation, foreground) : foreground,
        background: background ? correctAlpha(approximation, background) : background,
        fontStyle,
      },
    })),
  };
}

async function parseIncludeChain(themePath: string, variation: ThemeVariation): Promise<ResolvedTheme> {
  let allColors: Record<KnownColor, string> = {} as Record<KnownColor, string>;
  let allSettings: IRawThemeSetting[] = [];
  let appliedDefaults = false;

  while (true) {
    const {tokenColors, include, colors} = await parseThemeFile(themePath);

    if (tokenColors != null) {
      // Parent token colors should appear first
      allSettings = [...tokenColors, ...allSettings];
    }

    if (colors != null) {
      // Maintain colors from children
      allColors = {...colors, ...allColors};
    }

    if (include) {
      themePath = path.join(path.dirname(themePath), include);
      continue;
    }

    if (appliedDefaults) {
      break;
    }

    themePath = path.join(await REPO_ROOT, "metadata", "theme-defaults", variation + ".json");
    appliedDefaults = true;
  }

  return {
    colors: allColors,
    settings: allSettings,
  };
}

type AlphaApproximation = (value: number, percentage: number) => number;

function getAlphaApproximation(variation: ThemeVariation): AlphaApproximation {
  switch (variation) {
    case ThemeVariation.Dark:
    case ThemeVariation.HighContrast:
      // In dark themes, an opaque color is 255, and an invisible one is 0
      return (value, percentage) => value * percentage;
    case ThemeVariation.Light:
      // In light themes, an opaque color is 0, and an invisible one is 255.
      // We calculate its inverse to dim/brighten the correct (inverted) value.
      return (value, percentage) => 255 - (255 - value) * percentage;
  }
}

function correctAlpha(approximation: AlphaApproximation, hexColor: string): string {
  hexColor = hexColor.toUpperCase();

  if (/^#[A-Z0-9]{3}$/.test(hexColor)) {
    const [hash, r, g, b] = hexColor;
    return hash + r + r + g + g + b + b;
  } else if (/^#[A-Z0-9]{4}$/.test(hexColor)) {
    const [, r, g, b, a] = hexColor;
    return correctAlphaAux(r + r, g + g, b + b, a + a);
  } else if (/^#[A-Z0-9]{6}$/.test(hexColor)) {
    return hexColor;
  } else if (/^#[A-Z0-9]{8}$/.test(hexColor)) {
    const [, r1, r2, g1, g2, b1, b2, a1, a2] = hexColor;
    return correctAlphaAux(r1 + r2, g1 + g2, b1 + b2, a1 + a2);
  } else {
    throw new Error(`Unsupported color '${hexColor}'.`);
  }

  function correctAlphaAux(redHex: string, greenHex: string, blueHex: string, alphaHex: string): string {
    const red = parseInt(redHex, 16);
    const green = parseInt(greenHex, 16);
    const blue = parseInt(blueHex, 16);
    const alpha = parseInt(alphaHex, 16);

    const percentage = alpha / 256;
    const calc = (value: number) =>
      Math.round(approximation(value, percentage)).toString(16).toUpperCase().padStart(2, "0");

    return "#" + calc(red) + calc(green) + calc(blue);
  }
}

interface ThemeFile {
  readonly include?: string;
  readonly colors?: Record<string, string>;
  readonly tokenColors?: IRawThemeSetting[];
}

async function parseThemeFile(filePath: string): Promise<ThemeFile> {
  const contents = await readFile(filePath, "utf8");
  const errors: JSONC.ParseError[] = [];
  const json = JSONC.parse(contents, errors, {
    allowEmptyContent: false,
    allowTrailingComma: true,
    disallowComments: false,
  });

  assert(
    errors.length === 0,
    `Error parsing: ${filePath}\n` +
      errors
        .map(({error, offset, length}) => `* [${offset} - ${length}] ${JSONC.printParseErrorCode(error)}`)
        .join("\n"),
  );

  return json;
}
