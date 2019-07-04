import { UserDto } from './User.dto';

// tslint:disable:no-duplicate-string
export namespace UserApiMock {
  export const USER_BASE = {
    id: '74c89a31-0e6c-4440-aa8c-9006d83afa17',
    firstName: 'Robert',
    lastName: 'DeFoe',
    email: 'admin@example.com',
    permissions: 0,
  };

  export const ADMIN: UserDto.Get = {
    ...USER_BASE,
    id: '364119a6-c6dc-4485-b9ac-22d07fe62b0a',
    role: 'ROLE_ADMIN',
    effectiveRoles: ['ROLE_ADMIN'],
  };

}
