import { Action } from 'redux-actions';

export namespace SelectionAction {
  export type ChangeSelection<T = any> = Action<T[]>;

  /**
   * Create domain specific action types
   */
  export function createTypes(domain: string) {
    const CHANGE_SELECTION = `CHANGE_SELECTION_${domain}`;

    return {
      CHANGE_SELECTION
    };
  }

  /**
   * Create domain specific actions
   */
  export function create<T = any>(domain: string) {
    const { CHANGE_SELECTION } = createTypes(domain);
    const changeSelection = (selection: T[]): ChangeSelection<T> => ({
      type: CHANGE_SELECTION,
      payload: selection
    });

    return {
      CHANGE_SELECTION,
      changeSelection
    };
  }
}
