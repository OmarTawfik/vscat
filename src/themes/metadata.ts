import {IRawThemeSetting} from "vscode-textmate";
import {REPO_ROOT, readAndCacheFile} from "../utils";

export enum ThemeVariation {
  Light = "light",
  Dark = "dark",
  HighContrast = "high-contrast",
}

export interface ThemeMetadata {
  readonly id: string;
  readonly label: string;
  readonly variation: ThemeVariation;
}

export type ThemeMetadataFile = readonly ThemeMetadata[];

export type KnownColor =
  // General
  | "editor.foreground"
  | "editor.background"
  | "editorLineNumber.foreground"
  | "editorWhitespace.foreground"
  // Diagnostics
  | "editorError.foreground"
  | "editorWarning.foreground"
  | "editorInfo.foreground"
  | "editorHint.foreground"
  // Diffs
  | "diffEditor.insertedTextBackground"
  | "diffEditor.removedTextBackground";

export interface ResolvedTheme {
  readonly colors: Readonly<Record<KnownColor, string>>;
  readonly settings: readonly IRawThemeSetting[];
}

export async function getSupportedThemes(): Promise<Readonly<ThemeMetadataFile>> {
  const themeMetadata = await readAndCacheFile<ThemeMetadataFile>(await REPO_ROOT, "metadata/themes.json");
  return themeMetadata;
}
