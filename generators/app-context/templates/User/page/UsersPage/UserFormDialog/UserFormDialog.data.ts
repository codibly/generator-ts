import { composeValidators, isRequired } from 'revalidate';
import { combineValidators } from '../../../../@codibly/revalidate-formik';
import { isEmail } from '@codibly/validator/isEmail';
import { UserDto } from '../../../api/User/User.dto';
import { UserMapper } from '../../../api/User/User.mapper';
import { User } from '../../../model/User';

export type UserFormDialogData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  role: string;
  timeZone: string;
  timeFormat: string;
  dateFormat: string;
  startDate: string | null;
  endDate: string | null;
  language: string;
  company: string;
  permissions: (boolean | undefined)[];
  enabled: boolean;
  subBrokerCompanyName: string;
};

export namespace UserFormDialogData {
  // tslint:disable-next-line:cyclomatic-complexity
  export const initialValues = (user?: User) => {
    return {
      id: user ? user.id : '',
      firstName: user ? user.firstName : '',
      lastName: user ? user.lastName : '',
      email: user ? user.email : '',
      role: user ? user.role : '',
      permissions: user
        ? UserMapper.permissionNumberToArray(user.permissions).reduce(
            (permissions, permissionFlag) => {
              const newPermissions = permissions.slice();
              newPermissions[permissionFlag] = true;
              return newPermissions;
            },
            [] as (boolean | undefined)[]
          )
        : [],
    };
  };

  function toUserBaseDto(data: Partial<UserFormDialogData>): UserDto.Base {
    return {
      firstName: data.firstName!,
      lastName: data.lastName!,
      email: data.email!
    };
  }

  function toUserPermissionsDto(permissions: (boolean | undefined)[]): number[] {
    return permissions
      .map((enabled, index) => (enabled ? index : 0))
      .filter((permission) => permission !== 0);
  }

  export function toUserCreateDto(data: Partial<UserFormDialogData>): UserDto.Create {
    return {
      ...toUserBaseDto(data),
      role: data.role!,
      permissions: toUserPermissionsDto(data.permissions || [])
    };
  }

  export function toUserUpdateDto(data: Partial<UserFormDialogData>): UserDto.Update {
    return {
      ...toUserBaseDto(data),
      id: data.id!,
      permissions: toUserPermissionsDto(data.permissions || [])
    };
  }

  export function toSnackbarCreatedMessage(user: User): string {
    return `User "${User.getName(user)}" created successfully`;
  }

  export function toSnackbarUpdatedMessage(user: User): string {
    return `User "${User.getName(user)}" updated successfully`;
  }

  export const validate = combineValidators({
    firstName: isRequired({ message: 'Please enter first name' }),
    lastName: isRequired({ message: 'Please enter last name' }),
    email: composeValidators(
      isRequired({ message: 'Please enter an email' }),
      isEmail({ message: 'Please enter a valid email address' })
    )('email'),
    role: isRequired({ message: 'Please select a role' }),
  });
}
