import {renderScreenshots} from "./tests/highlighting/workers/renderer";

export default async function (): Promise<void> {
  await renderScreenshots();
}
