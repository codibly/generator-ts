import {
  combineValidators,
  composeValidators,
  isRequired,
} from 'revalidate';
import { isEmail } from '@codibly/validator/isEmail';

export type ForgottenPasswordFormData = {
  email: string;
};

export namespace ForgottenPasswordFormData {
  export const initialValues = () => {
    return {
      email: ''
    };
  };

  export const validate = combineValidators({
    email: composeValidators(
      isRequired({ message: 'Please enter an email' }),
      isEmail({ message: 'Please enter a valid email address' })
    )('email')
  });
}
