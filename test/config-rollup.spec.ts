import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:config-rollup", () => {
  beforeAll(async () => {
    await helpers.run(require("../lib/generator/config-rollup"), {
      resolved: require.resolve("../lib/generator/config-rollup/index.js"),
      namespace: "codibly-ts:config-rollup"
    });
  });

  it("generates required files", () => {
    assert.file(["package.json", ".gitignore", "rollup.config.js"]);
  });

  it("extends package.json", () => {
    assert.jsonFileContent("package.json", {
      main: "lib/index.js",
      module: "lib/index.es.js",
      scripts: {
        build: "rollup -c"
      },
      devDependencies: {
        rollup: "^1.0.2",
        "rollup-plugin-cleaner": "^0.2.0",
        "rollup-plugin-sourcemaps": "^0.4.2",
        "rollup-plugin-typescript2": "^0.20.1"
      }
    });
  });

  it("extends .gitignore", () => {
    assert.fileContent(".gitignore", "### Rollup");
    assert.fileContent(".gitignore", "/lib");
    assert.fileContent(".gitignore", ".rpt2_cache");
  });
});
