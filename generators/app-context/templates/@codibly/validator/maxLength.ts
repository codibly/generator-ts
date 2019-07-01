import memoize from 'fast-memoize';
import { Validator } from './Validator';

/**
 * @deprecated
 * use revalidate instead
 */
export const maxLength = memoize(
  (max: number, message: string): Validator => (value: string) => {
    return value && value.length > max ? message : undefined;
  }
);
