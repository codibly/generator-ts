import { Action } from 'redux-actions';
import { Filters } from '../../model/Filters';

export namespace FiltersAction {
  export type SetFilters = Action<Filters>;
  export type ChangeFilters = Action<Filters>;
  export type ChangeFilter = Action<{ field: string; value: any }>;
  export type RemoveFilter = Action<{ field: string }>;

  /**
   * Create domain specific action types
   */
  export function createTypes(domain: string) {
    const SET_FILTERS = `SET_FILTERS_${domain}`;
    const CHANGE_FILTERS = `CHANGE_FILTERS_${domain}`;
    const CHANGE_FILTER = `CHANGE_FILTER_${domain}`;
    const REMOVE_FILTER = `REMOVE_FILTER_${domain}`;

    return {
      SET_FILTERS,
      CHANGE_FILTERS,
      CHANGE_FILTER,
      REMOVE_FILTER
    };
  }

  /**
   * Create domain specific actions
   */
  export function create(domain: string) {
    const { SET_FILTERS, CHANGE_FILTERS, CHANGE_FILTER, REMOVE_FILTER } = createTypes(domain);

    const setFilters = (filters: Filters): SetFilters => ({
      type: SET_FILTERS,
      payload: filters
    });
    const changeFilters = (filters: Filters): ChangeFilters => ({
      type: CHANGE_FILTERS,
      payload: filters
    });
    const changeFilter = (field: string, value: any): ChangeFilter => ({
      type: CHANGE_FILTER,
      payload: { field, value }
    });
    const removeFilter = (field: string): RemoveFilter => ({
      type: REMOVE_FILTER,
      payload: { field }
    });

    return {
      SET_FILTERS,
      CHANGE_FILTERS,
      CHANGE_FILTER,
      REMOVE_FILTER,
      setFilters,
      changeFilters,
      changeFilter,
      removeFilter
    };
  }
}
