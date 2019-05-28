import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:config-release", () => {
  beforeAll(async () => {
    await helpers.run(require("../generators/config-release"), {
      resolved: require.resolve("../generators/config-release/index.js"),
      namespace: "codibly-ts:config-release"
    });
  });

  it("generates required files", () => {
    assert.file([`package.json`, `README.md`]);
  });

  it("extends package.json", () => {
    assert.jsonFileContent(`package.json`, {
      scripts: {
        "semantic-release": "semantic-release"
      },
      release: {
        branches: [
          "master",
          {
            name: "beta",
            prerelease: true
          },
          {
            name: "alpha",
            prerelease: true
          }
        ]
      },
      devDependencies: {
        "semantic-release": "^16.0.0-beta.18"
      }
    });
  });

  it("adds badges to the README.md", () => {
    assert.fileContent(
      `README.md`,
      "[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)"
    );
  });
});
