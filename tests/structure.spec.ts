import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:structure", () => {
  const path = "tmp/Post/component/PostDetails/PostDetails";

  beforeAll(async () => {
    await helpers
      .run(require("../generators/structure"), {
        resolved: require.resolve("../generators/structure/index.js"),
        namespace: "codibly-ts:structure"
      })
      .withLocalConfig({ rootDir: "tmp", styling: "styled-components" })
      .withPrompts({
        task: "component",
        isTaskNameSameAsModule: "n",
        module: "Post",
        type: "function",
        name: "PostDetails"
      });
  });

  it("generates required files", () => {
    assert.file([
      `${path}.tsx`,
      `${path}.story.tsx`,
      `${path}.style.ts`,
      `${path}.spec.tsx`
    ]);
  });
});
