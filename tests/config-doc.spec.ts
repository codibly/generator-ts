import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:config-doc", () => {
  beforeAll(async () => {
    await helpers.run(require("../generators/config-doc/index.js"), {
      resolved: require.resolve("../generators/config-doc/index.js"),
      namespace: "codibly-ts:config-doc"
    });
  });

  it("generates required files", () => {
    assert.file([".gitignore", "package.json"]);
  });

  it("extends package.json", () => {
    assert.jsonFileContent("package.json", {
      scripts: {
        doc: "typedoc --out doc --mode file --ignoreCompilerErrors src"
      },
      devDependencies: {
        typedoc: "^0.14.2"
      }
    });
  });

  it("extends .gitignore", () => {
    assert.fileContent(".gitignore", "### TypeDoc");
    assert.fileContent(".gitignore", "/doc");
  });
});
