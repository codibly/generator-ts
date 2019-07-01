import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:config-webpack", () => {
  beforeAll(async () => {
    await helpers.run(require("../generators/config-webpack"), {
      resolved: require.resolve("../generators/config-webpack/index.js"),
      namespace: "codibly-ts:config-webpack"
    });
  });

  it("generates required files", () => {
    assert.file(["webpack.config.js"]);
  });

  it("extends package.json", () => {
    assert.jsonFileContent("package.json", {
      scripts: {
        dev: "webpack-dev-server --open",
        build: "webpack -p"
      },
      devDependencies: {
        "@types/webpack": "^4.4.24",
        "@types/webpack-env": "^1.13.7",
        "clean-webpack-plugin": "^3.0.0",
        "file-loader": "^4.0.0",
        "fork-ts-checker-webpack-plugin": "^1.3.5",
        "html-webpack-plugin": "^3.2.0",
        "robotstxt-webpack-plugin": "^5.0.0",
        "ts-loader": "^6.0.2",
        "tsconfig-paths-webpack-plugin": "^3.2.0",
        webpack: "^4.29.0",
        "webpack-cli": "^3.2.1",
        "webpack-dev-server": "^3.1.14"
      }
    });
  });
});
