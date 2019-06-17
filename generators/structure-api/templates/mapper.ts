import { <%= name %>Dto } from './<%= name %>.dto';
import { <%= name %> } from '../model/<%= name %>';

export namespace <%= name %>Mapper {
  export const map = (<%= nameCamelCase %>: <%= name %>Dto): <%= name %> => ({
    ...<%= nameCamelCase %>
  });
}
