import joi from "joi";
import {highlightSource as highlightSourceUtil} from "./highlighting/highlight-source";
import {highlightDiagnostic as highlightDiagnosticUtil} from "./highlighting/highlight-diagnostics";
import {highlightDiff as highlightDiffUtil} from "./highlighting/highlight-diffs";
import {getSupportedLanguages as getSupportedLanguagesUtil} from "./languages/metadata";
import {getSupportedThemes as getSupportedThemesUtil} from "./themes/metadata";
import {
  HighlightDiagnosticOptions,
  HighlightDiagnosticOptionsSchema,
  HighlightDiffOptions,
  HighlightDiffOptionsSchema,
  HighlightSourceOptions,
  HighlightSourceOptionsSchema,
} from "./options";

export {HighlightSourceOptions, HighlightDiagnosticOptions, HighlightDiffOptions};

export async function highlightSource(options: HighlightSourceOptions): Promise<string[]> {
  const schema = await HighlightSourceOptionsSchema();
  const validatedOptions = joi.attempt(options, schema);

  return highlightSourceUtil(validatedOptions);
}

export async function highlightDiagnostic(options: HighlightDiagnosticOptions): Promise<string[]> {
  const schema = await HighlightDiagnosticOptionsSchema();
  const validatedOptions = joi.attempt(options, schema);

  return highlightDiagnosticUtil(validatedOptions);
}

export async function highlightDiff(options: HighlightDiffOptions): Promise<string[]> {
  const schema = await HighlightDiffOptionsSchema();
  const validatedOptions = joi.attempt(options, schema);

  return highlightDiffUtil(validatedOptions);
}

export interface SupportedLanguage {
  readonly id: string;
}

export async function getSupportedLanguages(): Promise<SupportedLanguage[]> {
  const languages = await getSupportedLanguagesUtil();
  return languages.map((language) => ({
    id: language.id,
  }));
}

export interface SupportedTheme {
  readonly id: string;
}

export async function getSupportedThemes(): Promise<SupportedTheme[]> {
  const themes = await getSupportedThemesUtil();
  return themes.map((theme) => ({
    id: theme.id,
  }));
}
