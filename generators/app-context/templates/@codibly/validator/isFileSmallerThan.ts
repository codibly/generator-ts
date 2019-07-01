import { createValidator } from 'revalidate';

export const isFileSmallerThan = (maxSize: number) =>
  createValidator(
    (message) => (value) => {
      if (value instanceof File && value.size >= maxSize) {
        return message;
      }
    },
    (field) => `${field} size must be less than ${maxSize}b`
  );
