import {LanguageMetadata, LanguageMetadataFile} from "../../src/languages/metadata";
import {addRequest} from "./rendering/requests";
import {IconRenderingRequest, ICON_SIZE} from "./rendering/icon-request";

const LANGUAGES_TABLE_WIDTH = 5;

export async function generateLanguagesTable(languages: Readonly<LanguageMetadataFile>): Promise<string> {
  const result: string[] = [];
  result.push("<table>");

  const remaining = [...languages];
  while (remaining.length > 0) {
    const row: (LanguageMetadata | null)[] = remaining.splice(0, LANGUAGES_TABLE_WIDTH);
    while (row.length < LANGUAGES_TABLE_WIDTH) {
      row.push(null);
    }

    result.push("  <tr>");

    for (const language of row) {
      if (language) {
        const iconUrl = addRequest(new IconRenderingRequest(language.id));

        result.push(`    <td>`);
        result.push(`      <img src="${iconUrl}" height="${ICON_SIZE}" width="${ICON_SIZE}" />`);
        result.push(`      <span>  </span>`);
        result.push(`      <code>${language.id}</code>`);
        result.push(`    </td>`);
      } else {
        result.push(`    <td></td>`);
      }
    }

    result.push("  </tr>");
  }

  result.push("</table>");
  return result.join("\n");
}
