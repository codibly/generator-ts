import { getIn } from 'formik';
import { createValidator } from 'revalidate';

export const isAfterDate = (key: string) =>
  createValidator(
    (message) => (date, allValues) => {
      const beforeDate = getIn(allValues, key);

      if (date && beforeDate && date <= beforeDate) {
        return message;
      }
    },
    (field) => `${field} should be after ${key}`
  );
