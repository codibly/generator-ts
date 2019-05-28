import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:config-ignore", () => {
  beforeAll(async () => {
    await helpers.run(require("../generators/config-ignore/index.js"), {
      resolved: require.resolve("../generators/config-ignore/index.js"),
      namespace: "codibly-ts:config-ignore"
    });
  });

  it("generates required files", () => {
    assert.file([".gitignore"]);
  });
});
