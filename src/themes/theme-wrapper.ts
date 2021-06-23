import assert from "assert";
import path from "path";
import * as TextMate from "vscode-textmate";
import {pathExists, readFile, readJson, readJSON} from "fs-extra";
import {KnownColor, ResolvedTheme, ThemeVariation} from "./metadata";
import {readAndCacheFile} from "../utils";
import {REPO_ROOT} from "../utils";
import {GrammarWrapper} from "../languages/grammar-wrapper";
import chalk from "chalk";
import {getSupportedLanguages, GrammarMetadataFile} from "../languages/metadata";
import {resolveTheme} from "./theme-resolver";
import {getOnigLib} from "./oniguruma-loader";

export type Brush = (value: string) => string;

export class ThemeWrapper {
  private readonly registery: TextMate.Registry;
  private readonly userSuppliedGrammars = new Map<string, string>();

  private constructor(private readonly theme?: ResolvedTheme) {
    this.registery = new TextMate.Registry({
      theme: {
        settings: theme ? [...theme.settings] : [],
      },
      onigLib: getOnigLib(),
      loadGrammar: async (scopeName) => {
        let grammarFilePath: string | undefined;
        if (this.userSuppliedGrammars.has(scopeName)) {
          grammarFilePath = this.userSuppliedGrammars.get(scopeName)!;
        } else {
          const grammars = await readAndCacheFile<GrammarMetadataFile>(await REPO_ROOT, "metadata", "grammars.json");
          const metadata = grammars[scopeName];
          if (!metadata) {
            return null;
          }

          grammarFilePath = path.join(await REPO_ROOT, "metadata", "grammars", metadata.grammarFileName);
        }

        const grammar = await readFile(grammarFilePath, "utf8");
        return TextMate.parseRawGrammar(grammar, grammarFilePath);
      },
    });
  }

  public static async create(themeIdOrPath?: string): Promise<ThemeWrapper> {
    if (!themeIdOrPath) {
      return new ThemeWrapper();
    }

    if (await pathExists(themeIdOrPath)) {
      // Assume it is a dark theme. Can we have a better detection here?
      const userSuppliedTheme = await resolveTheme(themeIdOrPath, ThemeVariation.Dark);
      return new ThemeWrapper(userSuppliedTheme);
    }

    const supportedThemePath = path.join(await REPO_ROOT, "metadata", "themes", themeIdOrPath + ".json");
    if (await pathExists(supportedThemePath)) {
      const supportedTheme = await readJSON(supportedThemePath);
      return new ThemeWrapper(supportedTheme);
    }

    throw new Error("Not a supported theme, or a path to a valid theme file: " + themeIdOrPath);
  }

  public async loadGrammar(languageIdOrPath?: string): Promise<GrammarWrapper> {
    if (!languageIdOrPath) {
      return new GrammarWrapper(
        // Fake tokenizer
        {
          tokenizeLine: (_, ruleStack: TextMate.StackElement) => ({tokens: [], ruleStack}),
          tokenizeLine2: (_, ruleStack: TextMate.StackElement) => ({tokens: new Uint32Array(), ruleStack}),
        },
        // empty color map
        [],
      );
    }

    let scopeName: string | undefined;
    if (await pathExists(languageIdOrPath)) {
      assert(
        path.extname(languageIdOrPath) === ".json",
        "Only user supplied JSON textmate grammar files are supported.",
      );

      scopeName = (await readJson(languageIdOrPath)).scopeName;
      assert(scopeName, "User supplied grammar must define a scope name.");

      this.userSuppliedGrammars.set(scopeName, languageIdOrPath);
    } else {
      const languages = await getSupportedLanguages();
      const language = languages.find((l) => l.id === languageIdOrPath);
      assert(language, "Unsupported language: " + languageIdOrPath);

      scopeName = language.scopeName;
    }

    assert(scopeName, "Unsupported language: " + languageIdOrPath);
    const rawGrammar = await this.registery.loadGrammar(scopeName);
    assert(rawGrammar, "Unable to resolve grammar file for: " + languageIdOrPath);
    return new GrammarWrapper(rawGrammar, this.registery.getColorMap());
  }

  public foreground(color: KnownColor): Brush {
    return this.theme ? chalk.hex(this.theme.colors[color]) : (value) => value;
  }

  public background(color: KnownColor): Brush {
    return this.theme ? chalk.bgHex(this.theme.colors[color]) : (value) => value;
  }
}
