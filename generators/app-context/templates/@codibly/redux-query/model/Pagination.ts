/**
 * Pagination description with 1-based page index
 */
export type Pagination = {
  page: number;
  perPage: number;
};

export namespace Pagination {
  export type Statistics = Pagination & {
    count?: number;
  };
}
