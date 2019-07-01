import { createValidator } from 'revalidate';

export const isGreaterThanOrEqual = (boundary: number) =>
  createValidator(
    (message) => (value) => {
      if (value === 0 || (value && (isNaN(Number(value)) || Number(value) < boundary))) {
        return message;
      }
    },
    (field) => `${field} has to be greater than or equal ${boundary}`
  );
