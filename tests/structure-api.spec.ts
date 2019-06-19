import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("yo codibly-ts:structure-api", () => {
  beforeAll(async () => {
    await helpers
      .run(require("../generators/structure-api"), {
        resolved: require.resolve("../generators/structure-api/index.js"),
        namespace: "codibly-ts:structure-api"
      })
      .withOptions({ module: "User" })
      .withLocalConfig({ rootDir: "tmp" })
      .withPrompts({ name: "User" });
  });

  const path = "tmp/User/api/User/User";
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

  it("imports proper dto in Api", () => {
    assert.fileContent(apiPath, "import { UserDto } from './User.dto");
  });

  it("creates proper Api interface", () => {
    assert.fileContent(apiPath, "list(): Promise<UserDto.ListElement[]>");
    assert.fileContent(
      apiPath,
      "get(entityId: UserDto.Get['id']): Promise<UserDto.Get>"
    );
    assert.fileContent(
      apiPath,
      "create(entity: UserDto.Create): Promise<UserDto.Get>"
    );
    assert.fileContent(
      apiPath,
      "update(entity: UserDto.Update): Promise<UserDto.Get>"
    );
    assert.fileContent(
      apiPath,
      "remove(entityId: UserDto.Get['id']): Promise<UserDto.Get>"
    );
  });

  it("creates Dto namespace", () => {
    assert.fileContent(dtoPath, "namespace UserDto");
  });

  it("creates proper Dto interface", () => {
    assert.fileContent(dtoPath, "export type Update = Partial<UserDto.Get>;");
  });

  it("creates Mapper namespace", () => {
    assert.fileContent(mapperPath, "namespace UserMapper");
  });

  it("imports proper deps in Mapper", () => {
    assert.fileContent(mapperPath, "import { UserDto } from './User.dto';");
    assert.fileContent(mapperPath, "import { User } from '../model/User';");
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
      " mock.onDelete('/api/user/:id').reply(status);"
    );
  });
});
