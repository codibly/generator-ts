import { Role } from './Role';

export type User = Readonly<{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  permissions: number;
}>;

export namespace User {
  export function getName(user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }

  export function isGranted(user: User | null, role: Role) {
    return user ? Role.isGranted(user.role, role) : false;
  }

  export function isGrantedSome(user: User | null, roles: Role[]) {
    return user ? roles.some((role) => isGranted(user, role)) : false;
  }

  export function isGrantedExact(user: User | null, predicates: Role.GrantForRolePredicate[]) {
    return Role.isGrantedFor(user ? [user.role] : [], predicates);
  }
}
