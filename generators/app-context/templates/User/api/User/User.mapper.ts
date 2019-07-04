
import { User } from '../../model/User';
import { RoleMapper } from '../Role/Role.mapper';
import { UserDto } from './User.dto';

export namespace UserMapper {
  export function fromDto(dto: UserDto.Get): User {
    return {
      ...dto,
      role: RoleMapper.fromDto(dto.role)
    };
  }

  // tslint:disable:no-bitwise
  export function permissionNumberToArray(permissions: number): number[] {
    return Array.apply(null, Array(32))
      .map((zero, index) => (permissions >> index) % 2 !== 0)
      .map((enabled, index) => (enabled ? Math.pow(2, index) : 0))
      .filter((flag) => flag !== 0);
  }

  export function permissionArrayToNumber(permissions: number[]): number {
    return permissions.reduce((num, permission) => num | permission, 0);
  }
  // tslint:enable:no-bitwise
}
