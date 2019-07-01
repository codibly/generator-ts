import { combineValidators, composeValidators, isRequired, matchesField } from 'revalidate';
import { minLength } from '@codibly/validator/minLength';
import { AuthDto } from 'Auth/api/Auth/Auth.dto';

export type ChangePasswordFormData = {
  current: string;
  new: string;
  confirmed: string;
};

export namespace ChangePasswordFormData {
  export const initialValues = () => {
    return {
      current: '',
      new: '',
      confirmed: ''
    };
  };

  export function toAuthChangePasswordDto(
    data: Partial<ChangePasswordFormData>
  ): AuthDto.ChangePassword {
    return {
      current: data.current!,
      new: data.new!
    };
  }

  export const validate = combineValidators({
    current: composeValidators(
      isRequired({ message: 'Please enter current password' }),
      minLength(8)({ message: 'Current password should have at least 8 characters' })
    )('current'),
    new: composeValidators(
      isRequired({ message: 'Please enter new password' }),
      minLength(8)({ message: 'New password should have at least 8 characters' })
    )('new'),
    confirmed: composeValidators(
      isRequired({ message: 'Please confirm new password' }),
      minLength(8)({ message: 'Confirmed password should have at least 8 characters' }),
      matchesField('new', 'New password')({ message: 'Passwords do not match' })
    )('confirm')
  });
}
