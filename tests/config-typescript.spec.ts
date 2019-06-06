import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:config-typescript", () => {
  beforeAll(async () => {
    await helpers.run(require("../generators/config-typescript"), {
      resolved: require.resolve("../generators/config-typescript/index.js"),
      namespace: "codibly-ts:config-typescript"
    });
  });

  it("generates required files", () => {
    assert.file(["package.json", "tsconfig.json"]);
  });

  it("extends package.json", () => {
    assert.jsonFileContent("package.json", {
      devDependencies: {
        tslib: "^1.9.3",
        typescript: "^3.4.5"
      }
    });
  });

  it("creates proper tsconfig.json file", () => {
    assert.jsonFileContent("tsconfig.json", {
      compilerOptions: {
        target: "es5",
        module: "esnext",
        lib: ["dom", "es6", "scripthost"],
        jsx: "react",
        sourceMap: true,
        outDir: "./dist",
        rootDir: "./src",
        importHelpers: true,
        skipLibCheck: true,
        skipDefaultLibCheck: true,
        strict: true,

        moduleResolution: "node",
        baseUrl: "./src",
        esModuleInterop: true,

        sourceRoot: "./src"
      }
    });
  });
});
