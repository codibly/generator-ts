import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:structure-page", () => {
  beforeAll(async () => {
    await helpers
      .run(require("../generators/structure"), {
        resolved: require.resolve("../generators/structure/index.js"),
        namespace: "codibly-ts:structure"
      })
      .withLocalConfig({ rootDir: "tmp" })
      .withPrompts({
        task: "page",
        isTaskNameSameAsModule: false,
        module: "User",
        name: "UserDetails"
      });
  });

  const path = "tmp/User/page/UserDetailsPage/UserDetailsPage";

  const mainPath = `${path}.tsx`;
  const loadPath = `${path}.load.tsx`;
  const stylePath = `${path}.style.ts`;
  const specPath = `${path}.spec.tsx`;

  it("generates required files", () => {
    assert.file([mainPath, loadPath, stylePath, specPath]);
  });

  it("creates proper content main page", () => {
    assert.fileContent(mainPath, "namespace UserDetailsPage");
    assert.fileContent(
      mainPath,
      "const UserDetailsPage: FC<UserDetailsPage.Props>"
    );
  });

  it("creates proper content in loadable page", () => {
    assert.fileContent(
      loadPath,
      'import { UserDetailsPage as UserDetailsPageType } from "./UserDetailsPage";'
    );
    assert.fileContent(
      loadPath,
      "const UserDetailsPageLoadable = Loadable<UserDetailsPageType.Props>"
    );
    assert.fileContent(
      loadPath,
      'import("./UserDetailsPage" /* webpackChunkName: "UserDetailsPage" */)'
    );
    assert.fileContent(
      loadPath,
      "({ UserDetailsPage }, props) => <UserDetailsPage {...props} />"
    );
  });

  it("creates proper content spec page", () => {
    assert.fileContent(
      specPath,
      'import { UserDetailsPage } from "./UserDetailsPage";'
    );
    assert.fileContent(specPath, "describe('<UserDetailsPage />'");
    assert.fileContent(specPath, "should render <UserDetailsPage />");
    assert.fileContent(specPath, "render(<UserDetailsPage />);");
  });
});
