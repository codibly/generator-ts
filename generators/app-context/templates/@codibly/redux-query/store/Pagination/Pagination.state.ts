import { Pagination } from '../../model/Pagination';

export type PaginationState = Pagination.Statistics;

export namespace PaginationState {
  export const INITIAL: PaginationState = {
    page: 1,
    perPage: 10,
    count: 0
  };
}
