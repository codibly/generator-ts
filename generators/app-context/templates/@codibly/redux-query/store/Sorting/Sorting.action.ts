import { Action } from 'redux-actions';
import { Sorting } from '../../model/Sorting';

export namespace SortingAction {
  export type ChangeSorting = Action<Sorting | null>;

  /**
   * Create domain specific action types
   */
  export function createTypes(domain: string) {
    const CHANGE_SORTING = `CHANGE_SORTING_${domain}`;

    return {
      CHANGE_SORTING
    };
  }

  /**
   * Create domain specific actions
   */
  export function create(domain: string) {
    const { CHANGE_SORTING } = createTypes(domain);
    const changeSorting = (sorting: Sorting | null): ChangeSorting => ({
      type: CHANGE_SORTING,
      payload: sorting
    });

    return {
      CHANGE_SORTING,
      changeSorting
    };
  }
}
