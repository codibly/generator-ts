import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:structure-store", () => {
  beforeAll(async () => {
    await helpers
      .run(require("../generators/structure"), {
        resolved: require.resolve("../generators/structure/index.js"),
        namespace: "codibly-ts:structure"
      })
      .withLocalConfig({ rootDir: "tmp" })
      .withPrompts({
        task: "store",
        isTaskNameSameAsModule: false,
        module: "UserDetails",
        name: "User"
      });
  });

  const path = "tmp/UserDetails/store/User/User";

  const actionPath = `${path}.action.ts`;
  const detectorPath = `${path}.detector.ts`;
  const reducerPath = `${path}.reducer.ts`;
  const selectorPath = `${path}.selector.ts`;
  const statePath = `${path}.state.ts`;

  it("generates required files", () => {
    assert.file([
      actionPath,
      detectorPath,
      reducerPath,
      selectorPath,
      statePath
    ]);
  });

  it("creates proper content in Action", () => {
    assert.fileContent(actionPath, "namespace UserAction {}");
  });

  it("creates proper content in Detector", () => {
    assert.fileContent(detectorPath, "const userDetector;");
  });

  it("creates proper content in Reducer", () => {
    assert.fileContent(
      reducerPath,
      "import { UserState } from './User.state';"
    );
    assert.fileContent(
      reducerPath,
      "export const userReducer = combineReducers<UserState>({});"
    );
  });

  it("create proper content in Selector", () => {
    assert.fileContent(
      selectorPath,
      "import { UserMountedState, UserState } from './User.state';"
    );
    assert.fileContent(selectorPath, "namespace UserSelector");
    assert.fileContent(
      selectorPath,
      "const getDomain = (state?: UserMountedState) => (state && state.user) || ({} as UserState)"
    );
  });

  it("create proper content in State", () => {
    assert.fileContent(statePath, "namespace UserState");
    assert.fileContent(statePath, "const INITIAL: UserState = {};");
    assert.fileContent(statePath, 'const DOMAIN = "USER";');
    assert.fileContent(statePath, "type UserMountedState");
  });
});
