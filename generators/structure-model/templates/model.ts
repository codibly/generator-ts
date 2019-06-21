import { Overwrite } from 'utility-types';
import { <%= name %>Dto } from '../api/<%= name %>.dto';

export type <%= name %> = <%= name %>.Standard;

export namespace <%= name %> {
  type Base = {
    id: string;
  };

  type Base = Overwrite<<%= name %>Dto.Base, {}>;

  export type Basic = Base;
  export type Standard = Base;

}
