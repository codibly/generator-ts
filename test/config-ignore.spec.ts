import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:config-ignore", () => {
  beforeAll(async () => {
    await helpers.run(require("../lib/generator/config-ignore/index.js"), {
      resolved: require.resolve("../lib/generator/config-ignore/index.js"),
      namespace: "codibly-ts:config-ignore"
    });
  });

  it("generates required files", () => {
    assert.file([".gitignore"]);
  });
});
