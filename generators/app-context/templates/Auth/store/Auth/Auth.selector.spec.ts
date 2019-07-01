import { AuthStatus } from '../../model/AuthStatus';
import { AuthSelector } from './Auth.selector';
import { AuthState } from './Auth.state';
import { AuthStateMock } from './Auth.state.mock';

describe('AuthSelector', () => {
  it('should get auth status', () => {
    expect(AuthSelector.getStatus(undefined)).toEqual(AuthStatus.UNKNOWN);
    expect(
      AuthSelector.getStatus(
        AuthStateMock.mountState({
          ...AuthState.INITIAL,
          status: AuthStatus.AUTHENTICATED
        })
      )
    ).toEqual(AuthStatus.AUTHENTICATED);
  });

  it('should check if is authenticated', () => {
    expect(AuthSelector.isAuthenticated(undefined)).toEqual(false);
    expect(
      AuthSelector.isAuthenticated(
        AuthStateMock.mountState({
          ...AuthState.INITIAL,
          status: AuthStatus.UNKNOWN
        })
      )
    ).toEqual(false);
    expect(
      AuthSelector.isAuthenticated(
        AuthStateMock.mountState({
          ...AuthState.INITIAL,
          status: AuthStatus.NOT_AUTHENTICATED
        })
      )
    ).toEqual(false);
    expect(
      AuthSelector.isAuthenticated(
        AuthStateMock.mountState({
          ...AuthState.INITIAL,
          status: AuthStatus.AUTHENTICATED
        })
      )
    ).toEqual(true);
  });

  it('should check if is not authenticated', () => {
    expect(AuthSelector.isNotAuthenticated(undefined)).toEqual(false);
    expect(
      AuthSelector.isNotAuthenticated(
        AuthStateMock.mountState({
          ...AuthState.INITIAL,
          status: AuthStatus.UNKNOWN
        })
      )
    ).toEqual(false);
    expect(
      AuthSelector.isNotAuthenticated(
        AuthStateMock.mountState({
          ...AuthState.INITIAL,
          status: AuthStatus.NOT_AUTHENTICATED
        })
      )
    ).toEqual(true);
    expect(
      AuthSelector.isNotAuthenticated(
        AuthStateMock.mountState({
          ...AuthState.INITIAL,
          status: AuthStatus.AUTHENTICATED
        })
      )
    ).toEqual(false);
  });

  it('should get myself', () => {
    expect(AuthSelector.getMyself(undefined)).toEqual(null);
    expect(
      AuthSelector.getMyself(
        AuthStateMock.mountState({
          ...AuthState.INITIAL,
          myself: AuthStateMock.myself
        })
      )
    ).toEqual(AuthStateMock.myself);
  });
});
