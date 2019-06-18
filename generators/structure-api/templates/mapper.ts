import { <%= name %>Dto } from './<%= name %>.dto';
import { <%= name %> } from '../model/<%= name %>';

export namespace <%= name %>Mapper {
  export const fromDto = (dto: <%= name %>Dto.Get): <%= name %> => ({
    ...dto
  });
}
