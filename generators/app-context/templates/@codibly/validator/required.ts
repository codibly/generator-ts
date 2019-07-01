import memoize from 'fast-memoize';
import { Validator } from './Validator';

/**
 * @deprecated
 * use revalidate instead
 */
export const required = memoize(
  (message: string): Validator => (value) => {
    if (typeof value === 'string') {
      value = value.trim();
    }

    return value === undefined || value === null || value === '' ? message : undefined;
  }
);
