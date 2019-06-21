import { UserDto } from './<%= name %>.dto';
import { User } from '../../model/<%= name %>';

export namespace <%= name %>Api {

  export function list(): Promise<<%= name %>.Basic[]> {
    return null;
  }

  export function get(<%= nameCamelCase %>Id: <%= name %>Dto.Get['id']): Promise<<%= name %>> {
    return null;
  }

  export function create(<%= nameCamelCase %>: <%= name %>Dto.Create): Promise<<%= name %>> {
    return null;
  }

  export function update(<%= nameCamelCase %>: <%= name %>Dto.Update): Promise<<%= name %>> {
    return null;
  }

  export function remove(<%= nameCamelCase %>Id: <%= name %>Dto.Get['id']): Promise<<%= name %>> {
    return null;
  }
}
