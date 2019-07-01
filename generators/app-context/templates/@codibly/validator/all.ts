import memoize from 'fast-memoize';
import { Validator } from './Validator';

/**
 * @deprecated
 * use revalidate instead
 */
export const all = memoize(
  (...validators: Validator[]): Validator => (value) =>
    validators.reduce((result, validator) => result || validator(value), undefined as
      | string
      | undefined),
  {
    strategy: memoize.strategies.variadic,
    serializer: (args: any[]) => args.reduce((hash, arg) => hash + arg.toString(), '')
  }
);
