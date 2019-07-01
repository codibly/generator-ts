import { AxiosResponse } from 'axios';
import { combineValidators, composeValidators, isRequired, matchesField } from 'revalidate';
import { ErrorCode } from 'Api/model/ErrorCode';
import { AuthDto } from 'Auth/api/Auth/Auth.dto';

export type ResetPasswordFormData = {
  password: string;
  confirmedPassword: string;
};

export namespace ResetPasswordFormData {
  export const initialValues = () => {
    return {
      password: '',
      confirmedPassword: ''
    };
  };

  export function toResetPasswordDto(data: Partial<ResetPasswordFormData>): AuthDto.ResetPassword {
    return {
      new: data.password!
    };
  }

  export const validate = combineValidators({
    password: composeValidators(isRequired({ message: 'Please enter new password' }))('password'),
    confirmedPassword: composeValidators(
      isRequired({ message: 'Please confirm new password' }),
      matchesField('password', 'Password')({ message: 'Passwords do not match' })
    )('confirmedPassword')
  });

  export function getErrorMessage(error?: AxiosResponse) {
    const code = error ? error.data.errorCode : undefined;
    const errorMessage =
      error && error.data ? error.data.violations[0].message : 'Unknown error - please try again';
    if (code === ErrorCode.VALIDATION_FAILED) {
      return errorMessage;
    } else {
      return 'Unknown error - please try again';
    }
  }
}
