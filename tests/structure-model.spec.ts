import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:structure-model", () => {
  beforeAll(async () => {
    await helpers
      .run(require("../generators/structure-model"), {
        resolved: require.resolve("../generators/structure-model/index.js"),
        namespace: "codibly-ts:structure-model"
      })
      .withOptions({ module: "Post" })
      .withLocalConfig({ rootDir: "tmp" })
      .withPrompts({ name: "Post" });
  });

  const filePath = "tmp/Post/model/Post.ts";

  it("generates required files", () => {
    assert.file(filePath);
  });

  it("generated proper type and namespace in Model", () => {
    assert.fileContent(filePath, "type Post");
    assert.fileContent(filePath, "namespace Post");
  });
});
