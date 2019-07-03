import MockAdapter from 'axios-mock-adapter';
import { AuthApiMock } from 'Auth/api/Auth/Auth.mock';
import {AuthDto} from "Auth/api/Auth/Auth.dto";

export namespace ApiMock {
  export function mockAll(
    mock: MockAdapter,
    myself: AuthDto.Myself | null = AuthApiMock.MYSELF_ADMIN
  ) {
    // Auth
    AuthApiMock.mockAll(mock, myself);
  }
}
