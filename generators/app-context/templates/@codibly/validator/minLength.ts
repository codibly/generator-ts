import { createValidator } from 'revalidate';

/**
 * @deprecated
 * use revalidate instead
 */
export const minLength = (min: number) =>
  createValidator(
    (message) => (value) => {
      if (value && value.length < min) {
        return message;
      }
    },
    (field) => `${field} should have at least ${min} characters`
  );
