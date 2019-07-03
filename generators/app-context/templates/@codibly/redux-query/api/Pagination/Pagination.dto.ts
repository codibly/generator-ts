/**
 * Describes how to paginate resource by API
 */
export type PaginationDto = {
  size: number;
  index: number;
};

export namespace PaginationDto {
  /**
   * Response from the API with pagination statistics
   */
  export type Statistics = {
    pageSize: number;
    pageIndex: number;
    pageCount: number;
    itemCount: number;
  };
}
