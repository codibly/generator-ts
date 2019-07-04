import { createSelector, Selector } from 'reselect';
import { PaginationState } from './Pagination.state';

export namespace PaginationSelector {
  export function create(selector: Selector<any, PaginationState>, defaultPerPage = 10) {
    /**
     * Get current page
     */
    const getPage = createSelector(
      selector,
      (pagination) => (pagination && pagination.page) || 1
    );

    /**
     * Get per page size
     */
    const getPerPage = createSelector(
      selector,
      (pagination) => (pagination && pagination.perPage) || defaultPerPage
    );

    /**
     * Get count of all found records
     */
    const getCount = createSelector(
      selector,
      (pagination) => (pagination && pagination.count) || 0
    );

    return {
      getPage,
      getPerPage,
      getCount
    };
  }
}
