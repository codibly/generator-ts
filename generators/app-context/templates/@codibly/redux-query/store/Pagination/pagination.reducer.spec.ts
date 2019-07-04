import { createAsyncActions } from '@codibly/redux-async/Async.action';
import { FiltersAction } from '../Filters/Filters.action';
import { PaginationAction } from './Pagination.action';
import { handlePagination } from './pagination.reducer';
import { PaginationState } from './Pagination.state';

describe('paginationReducer', () => {
  it('should create custom reducer for domain', () => {
    expect(handlePagination('X')).toBeDefined();
  });

  it('should handle undefined state', () => {
    const reducer = handlePagination('X');

    expect(reducer(undefined, { type: 'TEST' })).toEqual(PaginationState.INITIAL);
  });

  it('should handle CHANGE_PAGE action', () => {
    const reducer = handlePagination('X');
    const { changePage } = PaginationAction.create('X');
    const prevState = PaginationState.INITIAL;
    const nextState = {
      ...PaginationState.INITIAL,
      page: 7
    };

    expect(reducer(prevState, changePage(7))).toEqual(nextState);
  });

  it('should handle CHANGE_PER_PAGE action', () => {
    const reducer = handlePagination('X');
    const { changePerPage } = PaginationAction.create('X');
    const prevState = PaginationState.INITIAL;
    const nextState = {
      ...PaginationState.INITIAL,
      perPage: 100
    };

    expect(reducer(prevState, changePerPage(100))).toEqual(nextState);
  });

  it('should handle filters actions', () => {
    const reducer = handlePagination('X');
    const { setFilters, changeFilters, changeFilter, removeFilter } = FiltersAction.create('X');
    const prevState = {
      ...PaginationState.INITIAL,
      page: 10
    };
    const nextState = {
      ...prevState,
      page: 1
    };

    expect(reducer(prevState, setFilters({ name: 'John' }))).toEqual(nextState);
    expect(reducer(prevState, changeFilters({ name: 'John' }))).toEqual(nextState);
    expect(reducer(prevState, changeFilter('name', 'John'))).toEqual(nextState);
    expect(reducer(prevState, removeFilter('name'))).toEqual(nextState);
  });

  it('should handle async action', () => {
    const reducer = handlePagination('X', 'SOME_ASYNC');
    const { resolved } = createAsyncActions('SOME_ASYNC');

    const prevState = PaginationState.INITIAL;
    const nextState = {
      ...PaginationState.INITIAL,
      page: 6,
      count: 153
    };

    // we should ignore perPage field
    expect(
      reducer(prevState, resolved({ pagination: { page: 6, perPage: 123, count: 153 } }))
    ).toEqual(nextState);
  });

  it('should handle async action for empty results', () => {
    const reducer = handlePagination('X', 'SOME_ASYNC');
    const { resolved } = createAsyncActions('SOME_ASYNC');

    const prevState = {
      ...PaginationState.INITIAL,
      page: 2,
      perPage: 10,
      count: 10
    };
    const nextState = {
      ...prevState,
      page: 1,
      count: 0
    };

    // we should ignore perPage field
    expect(
      reducer(prevState, resolved({ pagination: { page: 1, perPage: 10, count: 0 } }))
    ).toEqual(nextState);
  });
});
