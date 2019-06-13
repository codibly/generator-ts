import { <%= name %>Dto } from '../dto/<%= name %>Dto';
import { <%= name %> } from '../../model/<%= name %>';

export namespace <%= name %>Mapper {
  export const map = (<%= nameCamelCase %>: <%= name %>Dto): <%= name %> => ({
    ...<%= nameCamelCase %>
  });
}
