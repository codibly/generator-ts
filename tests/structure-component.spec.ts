import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:structure-component function styled-components", () => {
  const path = "tmp/Post/component/PostDetails/PostDetails";

  beforeAll(async () => {
    await helpers
      .run(require("../generators/structure-component"), {
        resolved: require.resolve("../generators/structure-component/index.js"),
        namespace: "codibly-ts:structure-component"
      })
      .withOptions({ module: "Post" })
      .withLocalConfig({ rootDir: "tmp", styling: "styled-components" })
      .withPrompts({ type: "function", name: "PostDetails" });
  });

  it("generates required files", () => {
    assert.file([
      `${path}.tsx`,
      `${path}.story.tsx`,
      `${path}.style.ts`,
      `${path}.spec.tsx`
    ]);
  });

  it("generates class component files", () => {
    assert.fileContent(`${path}.tsx`, "FC");
    assert.fileContent(`${path}.tsx`, "PostDetails");
  });

  it("generates jss styling", () => {
    assert.fileContent(`${path}.style.ts`, "styled-components");
  });
});

describe("yo codibly-ts:structure-component function emotion", () => {
  const path = "tmp/Post/component/PostDetails/PostDetails";

  beforeAll(async () => {
    await helpers
      .run(require("../generators/structure-component"), {
        resolved: require.resolve("../generators/structure-component/index.js"),
        namespace: "codibly-ts:structure-component"
      })
      .withOptions({ module: "Post" })
      .withLocalConfig({ rootDir: "tmp", styling: "emotion" })
      .withPrompts({ type: "function", name: "PostDetails" });
  });

  it("generates required files", () => {
    assert.file([
      `${path}.tsx`,
      `${path}.story.tsx`,
      `${path}.style.ts`,
      `${path}.spec.tsx`
    ]);
  });

  it("generates class component files", () => {
    assert.fileContent(`${path}.tsx`, "FC");
    assert.fileContent(`${path}.tsx`, "PostDetails");
  });

  it("generates jss styling", () => {
    assert.fileContent(`${path}.style.ts`, "emotion");
  });
});

describe("yo codibly-ts:structure-component class", () => {
  const path =
    "src/Organisation/component/OrganisationDetails/OrganisationDetails";

  beforeAll(async () => {
    await helpers
      .run(require("../generators/structure-component"), {
        resolved: require.resolve("../generators/structure-component/index.js"),
        namespace: "codibly-ts:structure-component"
      })
      .withOptions({ module: "Organisation" })
      .withLocalConfig({ rootDir: "src", styling: "jss" })
      .withPrompts({ type: "class", name: "OrganisationDetails" });
  });

  it("generates required files", () => {
    assert.file([
      `${path}.tsx`,
      `${path}.story.tsx`,
      `${path}.style.ts`,
      `${path}.spec.tsx`
    ]);
  });

  it("generates class component files", () => {
    assert.fileContent(`${path}.tsx`, "extends");
    assert.fileContent(`${path}.tsx`, "OrganisationDetails");
  });

  it("generates jss styling", () => {
    assert.fileContent(`${path}.style.ts`, "jss");
  });
});
