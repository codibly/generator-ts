import { createValidator } from 'revalidate';

export const isNumberLike = createValidator(
  (message) => (value) => {
    if (isNaN(Number(value))) {
      return message;
    }
  },
  (field) => `${field} has to be a valid number`
);
