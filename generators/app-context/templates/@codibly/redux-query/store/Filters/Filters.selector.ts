import memoize from 'fast-memoize';
import { createSelector, Selector } from 'reselect';
import { FiltersState } from './Filters.state';

export namespace FiltersSelector {
  export function create(selector: Selector<any, FiltersState>) {
    /**
     * Get search filter
     */
    const getFilter = memoize((field: string, defaultValue: null | string | [] = null) =>
      createSelector(
        selector,
        (filters) => (filters && filters[field]) || defaultValue
      )
    );

    return {
      getFilter
    };
  }
}
