import { Action } from 'redux-actions';

export namespace PaginationAction {
  export type ChangePageAction = Action<number>;
  export type ChangePerPageAction = Action<number>;

  /**
   * Create domain specific action types
   */
  export function createTypes(domain: string) {
    const CHANGE_PAGE = `CHANGE_PAGE_${domain}`;
    const CHANGE_PER_PAGE = `CHANGE_PER_PAGE_${domain}`;

    return {
      CHANGE_PAGE,
      CHANGE_PER_PAGE
    };
  }

  /**
   * Create domain specific actions
   */
  export function create(domain: string) {
    const { CHANGE_PAGE, CHANGE_PER_PAGE } = createTypes(domain);
    const changePage = (page: number): ChangePageAction => ({
      type: CHANGE_PAGE,
      payload: page
    });

    const changePerPage = (perPage: number): ChangePerPageAction => ({
      type: CHANGE_PER_PAGE,
      payload: perPage
    });

    return {
      CHANGE_PAGE,
      CHANGE_PER_PAGE,
      changePage,
      changePerPage
    };
  }
}
