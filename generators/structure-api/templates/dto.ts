
export namespace <%= name %>Dto {

  type Id = { id: string };

  export type Base = Id & { };

  export type ListElement = Base;

  export type List = { data: ListElement[] }

  export type Get = Base & { };

  export type Create = Base;

  export type Update = Partial<Get>;

}
