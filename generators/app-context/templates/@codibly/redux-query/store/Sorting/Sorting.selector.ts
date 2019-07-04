import { createSelector, Selector } from 'reselect';
import { SortingState } from './Sorting.state';

export namespace SortingSelector {
  export function create(selector: Selector<any, SortingState>) {
    /**
     * Get current page
     */
    const getField = createSelector(
      selector,
      (sorting) => (sorting ? sorting.field : null)
    );

    /**
     * Get per page size
     */
    const getDirection = createSelector(
      selector,
      (sorting) => (sorting ? sorting.direction : null)
    );

    return {
      getField,
      getDirection
    };
  }
}
