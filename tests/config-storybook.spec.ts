import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:config-storybook", () => {
  beforeAll(async () => {
    await helpers.run(require("../generators/config-storybook"), {
      resolved: require.resolve("../generators/config-storybook/index.js"),
      namespace: "codibly-ts:config-storybook"
    });
  });

  it("generates required files", () => {
    assert.file([
      "package.json",
      "README.md",
      ".storybook/config.ts",
      ".storybook/webpack.config.js",
      "src/index.story.tsx"
    ]);
  });

  it("extends package.json", () => {
    assert.jsonFileContent("package.json", {
      scripts: {
        storybook: "start-storybook",
        "storybook:build": "build-storybook -o storybook_dist"
      },
      devDependencies: {
        "@babel/core": "^7.0.0",
        "@storybook/react": "^5.0.5",
        "@types/storybook__react": "^4.0.0",
        "babel-loader": "^8.0.0"
      }
    });
  });

  it("adds badges to the README.md", () => {
    assert.fileContent(
      "README.md",
      "[![uses Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://storybook.js.org/)"
    );
  });
});
