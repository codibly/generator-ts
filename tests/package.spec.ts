import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:package", () => {
  beforeAll(async () => {
    await helpers
      .run(require("../generators/package"), {
        resolved: require.resolve("../generators/package/index.js"),
        namespace: "codibly-ts:package"
      })
      .withPrompts({
        name: "abc",
        description: "a description",
        version: "1.2.3",
        repository: "http://github.com/your-repo.git",
        author: "John Shepard"
      });
  });

  it("generates required files", () => {
    assert.file(["package.json", ".travis.yml", "LICENSE", "README.md"]);
  });

  it("extends package.json", () => {
    assert.jsonFileContent("package.json", {
      name: "abc",
      description: "a description",
      version: "1.2.3",
      repository: "http://github.com/your-repo.git",
      author: "John Shepard",
      license: "MIT"
    });
  });
});
