import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:structure-api", () => {
  beforeAll(async () => {
    await helpers
      .run(require("../generators/structure"), {
        resolved: require.resolve("../generators/structure/index.js"),
        namespace: "codibly-ts:structure"
      })
      .withLocalConfig({ rootDir: "tmp" })
      .withPrompts({
        task: "api",
        isTaskNameSameAsModule: false,
        module: "UserDetails",
        name: "User"
      });
  });

  const path = "tmp/UserDetails/api/User/User";

  const apiPath = `${path}.api.ts`;
  const dtoPath = `${path}.dto.ts`;
  const mapperPath = `${path}.mapper.ts`;
  const mockPath = `${path}.mock.ts`;

  it("generates required files", () => {
    assert.file([apiPath, dtoPath, mapperPath, mockPath]);
  });

  it("creates Api namespace", () => {
    assert.fileContent(apiPath, "namespace UserApi");
  });

  it("creates proper Api interface", () => {
    assert.fileContent(apiPath, "list(): Promise<User.Basic[]>");
    assert.fileContent(
      apiPath,
      "get(userId: UserDto.Get['id']): Promise<User>"
    );
    assert.fileContent(apiPath, "create(user: UserDto.Create): Promise<User>");
    assert.fileContent(apiPath, "update(user: UserDto.Update): Promise<User>");
    assert.fileContent(
      apiPath,
      "remove(userId: UserDto.Get['id']): Promise<User>"
    );
  });

  it("creates Dto namespace", () => {
    assert.fileContent(dtoPath, "namespace UserDto");
  });

  it("creates proper Dto interface", () => {
    assert.fileContent(dtoPath, "export type Update = Partial<Get>;");
  });

  it("creates Mapper namespace", () => {
    assert.fileContent(mapperPath, "namespace UserMapper");
  });

  it("imports proper deps in Mapper", () => {
    assert.fileContent(mapperPath, "import { UserDto } from './User.dto';");
    assert.fileContent(mapperPath, "import { User } from '../../model/User';");
  });

  it("creates proper Mapper interface", () => {
    assert.fileContent(
      mapperPath,
      "export const fromDto = (dto: UserDto.Get): User"
    );
  });

  it("creates Mock namespace", () => {
    assert.fileContent(mockPath, "namespace UserMock");
  });

  it("imports proper deps in Mock", () => {
    assert.fileContent(mockPath, "import { UserDto } from './User.dto';");
  });

  it("creates proper data consts placeholders in Mock", () => {
    assert.fileContent(mockPath, "export const USER_LIST: UserDto.List");
    assert.fileContent(mockPath, "export const USER_GET: UserDto.Get");
  });

  it("creates proper Mock functions", () => {
    assert.fileContent(
      mockPath,
      "mockOnGet(mock, '/api/user/:id', USER_LIST.data);"
    );
    assert.fileContent(
      mockPath,
      "mock.onGet('/api/user').reply(status, data);"
    );
    assert.fileContent(
      mockPath,
      "mock.onPost('/api/user').reply(({ data }) => [status, { ...(data || {}), id }]);"
    );
    assert.fileContent(
      mockPath,
      "mock.onPut('/api/user/:id', USER_UPDATE).reply(({ data }) => [status, data]);"
    );
    assert.fileContent(
      mockPath,
      "mock.onDelete('/api/user/:id').reply(status);"
    );
  });
});
