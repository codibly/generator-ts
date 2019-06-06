import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:config-test", () => {
  beforeAll(async () => {
    await helpers.run(require("../generators/config-test"), {
      resolved: require.resolve("../generators/config-test/index.js"),
      namespace: "codibly-ts:config-test"
    });
  });

  it("generates required files", () => {
    assert.file(["package.json", "README.md", "src/index.spec.ts"]);
  });

  it("extends package.json", () => {
    assert.jsonFileContent("package.json", {
      scripts: {
        test: "jest"
      },
      devDependencies: {
        "@types/jest": "^24.0.0",
        jest: "^24.1.0",
        "jest-haste-map": "^24.4.0",
        "jest-resolve": "^24.4.0",
        "ts-jest": "^24.0.0"
      },
      jest: {
        preset: "ts-jest",
        testEnvironment: "jsdom"
      }
    });
  });

  it("adds badges to the README.md", () => {
    assert.fileContent(
      "README.md",
      "[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)"
    );
  });
});
