import { ApiDto } from '@codibly/redux-query';
import { RoleDto } from '../Role/Role.dto';

export namespace UserDto {
  export type Base = {
    firstName: string;
    lastName: string;
    email: string;
    effectiveRoles?: RoleDto[];
  };

  export type Get = Base & {
    id: string;
    role: RoleDto;
    permissions: number;
  };

  export type Basic = Pick<Get, 'id' | 'email' | 'firstName' | 'lastName' | 'role'>;

  export type List = ApiDto.PaginatedResponse<Get>;

  export type Create = Base & {
    permissions: number[];
    role: RoleDto;
  };

  export type Update = Base & {
    permissions: number[];
    id: string;
  };
}
