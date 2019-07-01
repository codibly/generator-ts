import { ErrorCode } from '../model/ErrorCode';

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
    TMeta & { pagination: PaginationStatistics }
  >;

  /**
   * Default error response content from API
   */
  export type ErrorResponse<TErrorCode extends ErrorCode = ErrorCode> = {
    errorCode: TErrorCode;
    message: string;
  };

  /**
   * Describes how to paginate resource by API
   */
  export type Pagination = {
    size: number;
    index: number;
  };

  /**
   * Response from the API with pagination statistics
   */
  export type PaginationStatistics = Pagination & {
    count: number;
  };

  /**
   * Describes how to filter resource by API
   */
  export type Filter = string;

  export type SortingDirection = 'asc' | 'desc';

  /**
   * Describes how to sort resource by API
   */
  export type Sorting = {
    field: string;
    direction: SortingDirection;
  };

  /**
   * Default query for list with filter, pagination and sorting
   */
  export type Query = {
    f?: string;
    p?: Pagination;
    s?: Sorting;
  };
}
