import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:config-editor", () => {
  beforeAll(async () => {
    await helpers.run(require("../lib/generator/config-editor/index.js"), {
      resolved: require.resolve("../lib/generator/config-editor/index.js"),
      namespace: "codibly-ts:config-editor"
    });
  });

  it("generates required files", () => {
    assert.file([".editorconfig"]);
    assert.fileContent(".editorconfig", "root = true");
  });
});
