import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:config-react", () => {
  beforeAll(async () => {
    await helpers.run(require("../generators/config-react"), {
      resolved: require.resolve("../generators/config-react/index.js"),
      namespace: "codibly-ts:config-react"
    });
  });

  it("generates required files", () => {
    assert.file(["package.json"]);
  });

  it("extends package.json", () => {
    assert.jsonFileContent(`package.json`, {
      dependencies: {
        react: "^16.8.6",
        "react-dom": "^16.8.6"
      },
      devDependencies: {
        "@testing-library/react": "^8.0.1",
        "@types/react": "^16.8.20",
        "@types/react-dom": "^16.8.4"
      },
      jest: {
        testEnvironment: "jsdom",
        setupFilesAfterEnv: ["@testing-library/react/cleanup-after-each"]
      }
    });
  });
});
