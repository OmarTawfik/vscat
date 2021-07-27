import {detectLanguage} from "../src/languages/language-detection";

it("can detect langauge from extension", async () => {
  const langaugeId = await detectLanguage("foo/source.ts", "");
  expect(langaugeId).toEqual("typescript");
});

it("can detect shebangs in first line of file", async () => {
  const langaugeId = await detectLanguage(
    "foo/script",
    `#!/usr/bin/env node

function calculate(first, second) {
  return first * second;
}
`,
  );

  expect(langaugeId).toEqual("javascript");
});

it("can detect language from file name", async () => {
  const langaugeId = await detectLanguage("foo/.vscodeignore", "");
  expect(langaugeId).toEqual("ignore");
});

it("can detect language from file name pattern (leading glob)", async () => {
  const langaugeId = await detectLanguage("foo/.git/config", "");
  expect(langaugeId).toEqual("properties");
});

it("can detect language from file name pattern (trailing glob)", async () => {
  const langaugeId = await detectLanguage("foo/Dockerfile.Production", "");
  expect(langaugeId).toEqual("dockerfile");
});
