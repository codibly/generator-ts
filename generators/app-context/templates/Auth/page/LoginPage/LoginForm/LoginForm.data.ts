import { combineValidators } from '@codibly/revalidate-formik';
import { isEmail } from '@codibly/validator/isEmail';
import { AxiosResponse } from 'axios';
import { SERVICE_UNAVAILABLE, UNAUTHORIZED } from 'http-status-codes';
import { composeValidators, isRequired } from 'revalidate';
import { AuthErrorCode } from '../../../model/AuthErrorCode';

export type LoginFormData = {
  email: string;
  password: string;
  remember?: boolean;
};

export namespace LoginFormData {
  export const initialValues: LoginFormData = {
    email: '',
    password: '',
    remember: false
  };

  export const validate = combineValidators({
    email: composeValidators(
      isRequired({ message: 'Please enter an email' }),
      isEmail({ message: 'Please enter a valid email address' })
    )('email'),
    password: isRequired({ message: 'Please enter a password' })
  });

  export function getErrorMessage(error?: AxiosResponse) {
    const status = error ? error.status : undefined;

    switch (status) {
      case UNAUTHORIZED:
        const code = error && error.data ? error.data.errorCode : undefined;
        return getUnauthorizedErrorMessage(code);

      case SERVICE_UNAVAILABLE:
        return 'Platform is in the maintenance mode. Please try again later.';

      default:
        return 'Unknown error - please try again';
    }
  }

  function getUnauthorizedErrorMessage(code: AuthErrorCode) {
    switch (code) {
      case AuthErrorCode.ACCOUNT_DISABLED:
        return 'Account is disabled';

      case AuthErrorCode.ACCOUNT_EXPIRED:
        return 'Account is expired';

      case AuthErrorCode.BAD_CREDENTIALS:
        return 'Invalid email or password';

      default:
        return 'You are not authorised to access the dashboard';
    }
  }
}
