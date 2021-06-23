import micromatch from "micromatch";
import {InterfaceFrom} from "types-joi";
import assert from "assert";
import {PACKAGE_SCHEME, writeFormattedJSON} from "../utils";
import {REPO_ROOT} from "../../src/utils";
import path from "path";
import {copy} from "fs-extra";
import {GrammarMetadataFile, LanguageMetadataFile} from "../../src/languages/metadata";

const LANGUAGES: LanguageMetadataFile = [];
const GRAMMARS: GrammarMetadataFile = {};

const GRAMMAR_FILES_MAP = new Map<string, string>();

const DETECTED_EXTENSIONS = new Set<string>();
const DETECTED_FILE_NAME_PATTERNS = new Set<string>();
const DETECTED_FILE_NAMES = new Set<string>();
const DETECTED_FIRST_LINES = new Set<string>();

const EXCLUDED_LANGUAGES = new Set([
  // internal to VS Code
  "search-result",
  // languages without grammars (some third-party extensions can provide them).
  "jsx-tags",
  "juliamarkdown",
]);

export async function extractLanguages(
  contents: InterfaceFrom<typeof PACKAGE_SCHEME>,
  packageDir: string,
): Promise<void> {
  for (const {id, extensions, filenames, filenamePatterns, firstLine} of contents.contributes?.languages || []) {
    if (EXCLUDED_LANGUAGES.has(id)) {
      continue;
    }

    let language = LANGUAGES.find((l) => l.id === id);
    if (!language) {
      language = {
        id,
        extensions: [],
        fileNames: [],
        fileNamePatterns: [],
        firstLines: [],
      };

      LANGUAGES.push(language);
    }

    language.extensions.push(...(extensions || []));
    language.fileNames.push(...(filenames || []));
    language.fileNamePatterns.push(...(filenamePatterns || []));
    !firstLine || language.firstLines.push(firstLine);

    console.log(`    | 📚 ${id}`);
  }

  for (const {
    language: languageId,
    embeddedLanguages,
    injectTo,
    path: grammarRelativePath,
    scopeName,
    tokenTypes,
  } of contents.contributes?.grammars || []) {
    if (languageId) {
      if (EXCLUDED_LANGUAGES.has(languageId)) {
        continue;
      }

      switch (scopeName) {
        case "source.cpp.embedded.macro":
        case "text.html.php": {
          // There are some extensions that define multiple grammars for the same language.
          // We should skip the "other" grammar to only include the main ones.
          // https://github.com/microsoft/vscode/issues/127917
          break;
        }
        default: {
          const language = LANGUAGES.find((l) => l.id === languageId);
          assert(language);
          assert(!language.scopeName, "Duplicate scopeName for language: " + languageId);
          language.scopeName = scopeName;
          break;
        }
      }
    }

    const grammarFullPath = path.join(packageDir, grammarRelativePath);
    const grammarFileName = scopeName + path.extname(grammarFullPath);

    assert(
      !GRAMMARS[scopeName] || GRAMMARS[scopeName].grammarFileName === grammarFileName,
      "Duplicate grammar for: " + scopeName,
    );

    if (GRAMMAR_FILES_MAP.has(grammarFileName)) {
      assert(GRAMMAR_FILES_MAP.get(grammarFileName) === grammarFullPath);
    } else {
      GRAMMAR_FILES_MAP.set(grammarFileName, grammarFullPath);
    }

    const grammarDestination = path.join(await REPO_ROOT, "metadata", "grammars", grammarFileName);
    await copy(grammarFullPath, grammarDestination);

    GRAMMARS[scopeName] = {
      injectTo: injectTo || [],
      tokenTypes: tokenTypes || {},
      embeddedLanguages: embeddedLanguages || {},
      grammarFileName,
    };

    console.log(`    | 📄 ${scopeName}`);
  }
}

export async function writeLanguagesFile(): Promise<void> {
  for (const {extensions, fileNamePatterns, fileNames, firstLines, scopeName} of LANGUAGES) {
    assert(scopeName);
    sortArray(extensions, DETECTED_EXTENSIONS);
    sortArray(fileNamePatterns, DETECTED_FILE_NAME_PATTERNS);
    sortArray(fileNames, DETECTED_FILE_NAMES);
    sortArray(firstLines, DETECTED_FIRST_LINES);

    fileNamePatterns.forEach((pattern) => {
      assert(micromatch.makeRe(pattern));
    });
  }

  LANGUAGES.sort((a, b) => a.id.localeCompare(b.id));

  const destination = path.join(await REPO_ROOT, "metadata", "languages.json");
  await writeFormattedJSON(destination, LANGUAGES);
}

export async function writeGrammarsFile(): Promise<void> {
  for (const scopeName of Object.keys(GRAMMARS)) {
    const grammar = GRAMMARS[scopeName];

    sortArray(grammar.injectTo);
    grammar.embeddedLanguages = sortObject(grammar.embeddedLanguages);
    grammar.tokenTypes = sortObject(grammar.tokenTypes);
  }

  const destination = path.join(await REPO_ROOT, "metadata", "grammars.json");
  await writeFormattedJSON(destination, sortObject(GRAMMARS));
}

function sortArray(ar: string[], uniques = new Set<string>()): void {
  for (const value of ar) {
    assert(!uniques.has(value), "duplicate value: " + value);
    uniques.add(value);
  }

  ar.sort();
}

function sortObject<V>(obj: Record<string, V>): Record<string, V> {
  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {} as Record<string, V>);
}
