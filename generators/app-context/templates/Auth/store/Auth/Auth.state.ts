import { User } from 'User/model/User';
import { AuthStatus } from '../../model/AuthStatus';

export type AuthState = {
  status: AuthStatus;
  myself: User | null;
};

export namespace AuthState {
  export const INITIAL: AuthState = {
    status: AuthStatus.UNKNOWN,
    myself: null
  };
}

export type AuthMountedState = {
  auth?: AuthState;
  [key: string]: any;
};
