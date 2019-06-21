
export namespace <%= name %>Api {

  export function list(): Promise<<%= name %>.Basic[]> {

  }

  export function get(<%= nameCamelCase %>Id: <%= name %>Dto.Get['id']): Promise<<%= name %>> {

  }

  export function create(<%= nameCamelCase %>: <%= name %>Dto.Create): Promise<<%= name %>> {

  }

  export function update(<%= nameCamelCase %>: <%= name %>Dto.Update): Promise<<%= name %>> {

  }

  export function remove(<%= nameCamelCase %>Id: <%= name %>Dto.Get['id']): Promise<<%= name %>> {

  }
}
