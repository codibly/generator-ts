import MockAdapter from 'axios-mock-adapter';
import { UserApiMock } from 'User/api/User/User.mock';
import { AuthDto } from './Auth.dto';

export namespace AuthApiMock {
  export const MYSELF_ADMIN: AuthDto.Myself = {
    ...UserApiMock.ADMIN
  };

  export const BAD_CREDENTIALS_ERROR = {
    errorCode: 'AUTH_BAD_CREDENTIALS',
    message: 'Invalid credentials'
  };
  export const ACCOUNT_DISABLED_ERROR = {
    errorCode: 'ACCOUNT_DISABLED',
    message: 'Account disabled'
  };
  export const ACCOUNT_EXPIRED_ERROR = {
    errorCode: 'ACCOUNT_EXPIRED',
    message: 'Account expired'
  };
  export const ACCOUNT_UNKNOWN_ERROR = {
    errorCode: 'FOO',
    message: 'Unknown error'
  };

  export function mockLogin(mock: MockAdapter, status = 204, response?: any) {
    mock.onPost('/auth').reply(status, response);
  }

  export function mockGetMyself(mock: MockAdapter, myself: AuthDto.Myself | null = MYSELF_ADMIN) {
    mock.onGet('/auth/myself').reply(() => {
      return myself ? [200, myself] : [404, {}];
    });
  }

  export function mockAll(mock: MockAdapter, myself: AuthDto.Myself | null = MYSELF_ADMIN) {
    mockGetMyself(mock, myself);
    mockLogin(mock);
  }
}
