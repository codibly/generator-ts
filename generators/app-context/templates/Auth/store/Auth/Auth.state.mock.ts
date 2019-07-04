import { UserApiMock } from 'User/api/User/User.mock';
import { UserMapper } from 'User/api/User/User.mapper';
import { User } from 'User/model/User';
import { AuthMountedState, AuthState } from './Auth.state';

export namespace AuthStateMock {
  export const mountState = (state: AuthState): AuthMountedState => ({
    auth: state
  });

  export const myself: User = UserMapper.fromDto(UserApiMock.ADMIN);
}
