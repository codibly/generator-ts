import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:structure-model", () => {
  it("tests Model with different name than Module name", async () => {
    await helpers
      .run(require("../generators/structure"), {
        resolved: require.resolve("../generators/structure/index.js"),
        namespace: "codibly-ts:structure"
      })
      .withLocalConfig({ rootDir: "tmp" })
      .withPrompts({
        task: "model",
        isTaskNameSameAsModule: false,
        module: "PostDetails",
        name: "Post"
      });

    const filePath = "tmp/PostDetails/model/Post.ts";

    assert.file(filePath);
    assert.fileContent(filePath, "type Post");
    assert.fileContent(filePath, "namespace Post");
  });

  it("tests Model with the same name that Module name", async () => {
    await helpers
      .run(require("../generators/structure"), {
        resolved: require.resolve("../generators/structure/index.js"),
        namespace: "codibly-ts:structure"
      })
      .withLocalConfig({ rootDir: "tmp" })
      .withPrompts({
        task: "model",
        isTaskNameSameAsModule: true,
        module: "Post"
      });

    const filePath = "tmp/Post/model/Post.ts";

    assert.file(filePath);

    assert.fileContent(filePath, "type Post");
    assert.fileContent(filePath, "namespace Post");
  });
});
