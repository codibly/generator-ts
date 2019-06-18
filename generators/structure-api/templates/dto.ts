
export namespace <%= name %>Dto {

  type Identifier = { id: string };

  type Basic = {

  };

  export type ListElement = Identifier & Basic;

  export interface ListMeta { pagination: { index: number, size: number, count: number }}

  export interface List { data: ListElement[], meta: ListMeta }

  export type Get = Identifier & Basic & { };

  export type Create = Basic;

  export type Update = Partial<<%= name %>Dto.Get>;

}
