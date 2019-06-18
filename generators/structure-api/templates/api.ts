import { <%= name %>Dto } from './<%= name %>.dto';

export namespace <%= name %>Api {

  export function list(): Promise<<%= name %>Dto.ListElement[]> {

  }

  export function get(entityId: <%= name %>Dto.Get['id']): Promise<<%= name %>Dto.Get> {

  }

  export function create(entity: <%= name %>Dto.Create): Promise<<%= name %>Dto.Get> {

  }

  export function update(entity: <%= name %>Dto.Update): Promise<<%= name %>Dto.Get> {

  }

  export function remove(entityId: <%= name %>Dto.Get['id']): Promise<<%= name %>Dto.Get> {

  }
}
