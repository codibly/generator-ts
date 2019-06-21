
export namespace <%= name %>Dto {

  export type Base = { id: string };

  export type ListElement = Base;

  export type List = { data: ListElement[] }

  export type Get = Base & { };

  export type Create = Base;

  export type Update = Partial<Get>;

}
