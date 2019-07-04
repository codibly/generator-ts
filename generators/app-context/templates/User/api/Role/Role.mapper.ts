import { Role } from '../../model/Role';
import { RoleDto } from './Role.dto';

export namespace RoleMapper {
  export function fromDto(dto: RoleDto): Role {
    if (Role.isValid(dto)) {
      return dto;
    } else {
      return Role.UNKNOWN;
    }
  }
}
