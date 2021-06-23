import path from "path";
import type {Config} from "@jest/types";

export default (): Config.InitialOptions => ({
  verbose: true,
  preset: "ts-jest",
  globalTeardown: path.resolve(__dirname, "jest.teardown.ts"),
  testPathIgnorePatterns: ["/node_modules/", "/out/", "/vscode/"],
});
