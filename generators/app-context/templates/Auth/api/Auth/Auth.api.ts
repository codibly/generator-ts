import { http } from 'Api';
import { ApiMapper } from '@codibly/redux-query';
import { UserMapper } from 'User/api/User/User.mapper';
import { User } from 'User/model/User';
import { AuthDto } from './Auth.dto';

// tslint:disable:no-identical-functions
export namespace AuthApi {
  /**
   * Login to the system
   */
  export function login(email: string, password: string, remember = false): Promise<undefined> {
    return http
      .post('/auth', { username: email, password, remember } as AuthDto.Login)
      .then((response) => response.data)
      .catch(ApiMapper.throwResponseError);
  }

  /**
   * Refresh auth token
   */
  export function refreshToken(): Promise<undefined> {
    return http
      .post('/auth/refresh')
      .then((response) => response.data)
      .catch(ApiMapper.throwResponseError);
  }

  /**
   * Logout from the system
   */
  export function logout(): Promise<undefined> {
    return http
      .post('/auth/logout')
      .then((response) => response.data)
      .catch(ApiMapper.throwResponseError);
  }

  /**
   * Get basic information about logged in user
   */
  export function checkMyself(): Promise<User> {
    return http
      .get('/auth/myself')
      .then((response) => UserMapper.fromDto(response.data))
      .catch(ApiMapper.throwResponseError);
  }

  export function resetPasswordRequest(dto: AuthDto.ResetPasswordRequest): Promise<undefined> {
    return http
      .post('/auth/password/recover', dto)
      .then((response) => response.data)
      .catch(ApiMapper.throwResponseError);
  }

  export function resetPassword(dto: AuthDto.ResetPassword): Promise<undefined> {
    return http
      .post('/auth/password', dto)
      .then((response) => response.data)
      .catch(ApiMapper.throwResponseError);
  }

  /**
   * Change logged user password
   */
  export function changePassword(dto: AuthDto.ChangePassword): Promise<undefined> {
    return http
      .post('/auth/password', dto)
      .then((response) => response.data)
      .catch(ApiMapper.throwResponseError);
  }
}
