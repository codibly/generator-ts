import { Overwrite } from 'utility-types';
import { <%= name %>Dto } from '../api/<%= name %>/<%= name %>.dto';

export type <%= name %> = <%= name %>.Standard;

export namespace <%= name %> {
  type Base = Overwrite<<%= name %>Dto.Base, {}>

  export type Basic = Base;

  export type Standard = Base;
}
