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
        task: "router",
        isTaskNameSameAsModule: true,
        module: "User",
        name: "User"
      });
  });

  const path = "tmp/User/router/User";

  const mainPath = `${path}Router.tsx`;
  const loadPath = `${path}Router.load.tsx`;
  const dataPath = `${path}Router.data.tsx`;
  const specPath = `${path}Router.spec.tsx`;
  const routePath = `${path}.route.ts`;

  it("generates required files", () => {
    assert.file([mainPath, loadPath, dataPath, specPath, routePath]);
  });

  it("creates proper content in main template", () => {
    assert.fileContent(mainPath, "namespace UserRouter");
    assert.fileContent(mainPath, "const UserRouter: FC<UserRouter.Props>");
    assert.fileContent(mainPath, "UserRouterData.ROUTE_ITEMS");
  });

  it("creates proper content in data template", () => {
    assert.fileContent(dataPath, "namespace UserRouter");
  });

  it("creates proper content in loadable template", () => {
    assert.fileContent(loadPath, "const UserRouterLoadable");
    assert.fileContent(loadPath, "render: ({ UserRouter }");
    assert.fileContent(loadPath, "<UserRouter {...props} />");
    assert.fileContent(loadPath, "export { UserRouterLoadable }");
  });

  it("creates proper content in spec template", () => {
    assert.fileContent(specPath, 'import { UserRouter } from "./UserRouter"');
    assert.fileContent(specPath, "describe('<UserRouter />'");
    assert.fileContent(specPath, "render(<UserRouter />");
  });

  it("creates proper content in route template", () => {
    assert.fileContent(routePath, "namespace UserRoute {}");
  });
});
