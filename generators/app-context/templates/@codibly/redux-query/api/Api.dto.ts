import {Pagination} from "../model/Pagination";

export namespace ApiDto {
  /**
   * Default response content from API
   */
  export type Response<TData, TMeta = {}> = {
    data: TData;
    meta?: TMeta;
  };

  /**
   * Default paginated response content from API
   */
  export type PaginatedResponse<TData, TMeta = {}> = Response<
    TData[],
    TMeta & { pagination: Pagination.Statistics }
  >;
}
