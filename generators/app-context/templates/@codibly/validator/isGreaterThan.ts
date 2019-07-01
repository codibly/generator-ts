import { createValidator } from 'revalidate';

export const isGreaterThan = (boundary: number) =>
  createValidator(
    (message) => (value) => {
      if (isNaN(Number(value)) || Number(value) <= boundary) {
        return message;
      }
    },
    (field) => `${field} has to be greater than ${boundary}`
  );
