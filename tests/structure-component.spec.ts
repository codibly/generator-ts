import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:structure-component", () => {
  it("tests function plain component with styled-components", async () => {
    await helpers
      .run(require("../generators/structure"), {
        resolved: require.resolve("../generators/structure/index.js"),
        namespace: "codibly-ts:structure"
      })
      .withLocalConfig({ rootDir: "tmp", styling: "styled-components" })
      .withPrompts({
        task: "component",
        isTaskNameSameAsModule: false,
        module: "Post",
        type: "plain",
        name: "PostDetails"
      });

    const path = "tmp/Post/component/PostDetails/PostDetails";

    assert.file([
      `${path}.tsx`,
      `${path}.story.tsx`,
      `${path}.style.ts`,
      `${path}.spec.tsx`
    ]);

    assert.fileContent(`${path}.tsx`, "FC");
    assert.fileContent(`${path}.tsx`, "PostDetails");

    assert.fileContent(`${path}.style.ts`, "styled-components");
  });

  it("tests function plain component with emotion", async () => {
    await helpers
      .run(require("../generators/structure"), {
        resolved: require.resolve("../generators/structure/index.js"),
        namespace: "codibly-ts:structure"
      })
      .withLocalConfig({ rootDir: "tmp", styling: "emotion" })
      .withPrompts({
        task: "component",
        isTaskNameSameAsModule: false,
        type: "plain",
        module: "Post",
        name: "PostDetails"
      });

    const path = "tmp/Post/component/PostDetails/PostDetails";

    assert.file([
      `${path}.tsx`,
      `${path}.story.tsx`,
      `${path}.style.ts`,
      `${path}.spec.tsx`
    ]);

    assert.fileContent(`${path}.tsx`, "FC");
    assert.fileContent(`${path}.tsx`, "PostDetails");

    assert.fileContent(`${path}.style.ts`, "emotion");
  });

  it("tests function connected component", async () => {
    await helpers
      .run(require("../generators/structure"), {
        resolved: require.resolve("../generators/structure/index.js"),
        namespace: "codibly-ts:structure"
      })
      .withLocalConfig({ rootDir: "src", styling: "jss" })
      .withPrompts({
        task: "component",
        isTaskNameSameAsModule: false,
        type: "connected",
        name: "OrganisationDetails",
        module: "Organisation"
      });

    const path =
      "src/Organisation/component/OrganisationDetails/OrganisationDetails";

    assert.file([
      `${path}.tsx`,
      `${path}.story.tsx`,
      `${path}.style.ts`,
      `${path}.spec.tsx`
    ]);

    assert.fileContent(`${path}.tsx`, "OrganisationDetails");

    assert.fileContent(`${path}.style.ts`, "jss");
  });

  it("creates proper content in spec ", async () => {
    await helpers
      .run(require("../generators/structure"), {
        resolved: require.resolve("../generators/structure/index.js"),
        namespace: "codibly-ts:structure"
      })
      .withLocalConfig({ rootDir: "src", styling: "jss" })
      .withPrompts({
        task: "component",
        isTaskNameSameAsModule: false,
        type: "connected",
        name: "OrganisationDetails",
        module: "Organisation"
      });

    const path =
      "src/Organisation/component/OrganisationDetails/OrganisationDetails";

    assert.fileContent(
      `${path}.spec.tsx`,
      'import { OrganisationDetails } from "./OrganisationDetails";'
    );
    assert.fileContent(
      `${path}.spec.tsx`,
      "describe('<OrganisationDetails />'"
    );
    assert.fileContent(
      `${path}.spec.tsx`,
      "should render <OrganisationDetails />"
    );
    assert.fileContent(`${path}.spec.tsx`, "render(<OrganisationDetails />);");
  });
});
