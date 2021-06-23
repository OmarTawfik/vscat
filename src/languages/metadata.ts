import {REPO_ROOT, readAndCacheFile} from "../utils";

export interface LanguageMetadata {
  id: string;
  scopeName?: string;
  extensions: string[];
  fileNames: string[];
  fileNamePatterns: string[];
  firstLines: string[];
}

export type LanguageMetadataFile = LanguageMetadata[];

export interface GrammarMetadata {
  grammarFileName: string;
  tokenTypes: Record<string, string>;
  injectTo: string[];
  embeddedLanguages: Record<string, string>;
}

export type GrammarMetadataFile = Record<string, GrammarMetadata>;

export async function getSupportedLanguages(): Promise<Readonly<LanguageMetadataFile>> {
  const languageMetadata = await readAndCacheFile<LanguageMetadataFile>(await REPO_ROOT, "metadata/languages.json");
  return languageMetadata;
}
