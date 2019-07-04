import { Role } from '../model/Role';
import { User } from '../model/User';

export namespace UserSecurity {
  export function canManageUsers(currentUser: User | null) {
    return User.isGrantedSome(currentUser, [Role.ADMIN]);
  }

  export function canEditUser(currentUser: User | null): boolean {
    return User.isGrantedExact(currentUser, [
      {
        roles: [Role.ADMIN],
        granted: true
      }
    ]);
  }
}
