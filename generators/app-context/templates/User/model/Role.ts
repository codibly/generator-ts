
export enum Role {
  ADMIN = 'ROLE_ADMIN',
  UNKNOWN = 'ROLE_UNKNOWN'
}

export namespace Role {
  export type GrantForRolePredicate = {
    roles: Role[];
    granted: ((roles: Role[]) => boolean) | boolean;
  };

  const ALL = [
    Role.ADMIN
  ];
  const LABELS = {
    [Role.ADMIN]: 'Admin',
    [Role.UNKNOWN]: 'Unknown'
  };

  export function getAll(): Role[] {
    return ALL;
  }

  /**
   * Check if role string is a valid role.
   */
  export function isValid(role: any): role is Role {
    return ALL.includes(role);
  }

  /**
   * Get role label
   */
  export function getLabel(role: Role): string {
    return LABELS[role] || LABELS[Role.UNKNOWN];
  }

  /**
   * Check if currentRole is granted to resource that requires expectedRole
   * @param currentRole
   * @param expectedRole
   */
  export function isGranted(currentRole: Role, expectedRole: Role): boolean {
    return currentRole === expectedRole;
  }

  export function isGrantedFor(roles: Role[] | undefined, predicates: GrantForRolePredicate[]) {
    return predicates.some((predicate) =>
      roles && roles.some((role) => predicate.roles.indexOf(role) !== -1)
        ? predicate.granted instanceof Function
          ? predicate.granted(roles)
          : predicate.granted
        : false
    );
  }
}
