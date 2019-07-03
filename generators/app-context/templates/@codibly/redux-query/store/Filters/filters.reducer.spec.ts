import { Filters } from '../../model/Filters';
import { FiltersAction } from './Filters.action';
import { handleFilters } from './filters.reducer';
import { FiltersState } from './Filters.state';

describe('filtersReducer', () => {
  it('should create custom reducer for domain', () => {
    expect(handleFilters('X')).toBeDefined();
  });

  it('should handle undefined state', () => {
    const reducer = handleFilters('X');

    expect(reducer(undefined, { type: 'TEST' })).toEqual(FiltersState.INITIAL);
  });

  it('should handle SET_FILTERS action', () => {
    const reducer = handleFilters('X');
    const { setFilters } = FiltersAction.create('X');
    const prevState = {};
    const nextState: Filters = { id: 124 };
    const overwrittenNextState: Filters = { name: 'John' };

    expect(reducer(prevState, setFilters({ id: 124 }))).toEqual(nextState);
    expect(reducer(prevState, setFilters({ name: 'John' }))).toEqual(overwrittenNextState);
    expect(reducer(nextState, setFilters({}))).toEqual({});
  });

  it('should handle CHANGE_FILTERS action', () => {
    const reducer = handleFilters('X');
    const { changeFilters } = FiltersAction.create('X');
    const prevState = {};
    const nextState: Filters = { id: 124 };
    const overwrittenNextState: Filters = { id: 421 };
    const extendedNextState: Filters = { id: 124, name: 'John' };

    expect(reducer(prevState, changeFilters({ id: 124 }))).toEqual(nextState);
    expect(reducer(nextState, changeFilters({}))).toEqual(nextState);
    expect(reducer(nextState, changeFilters({ id: 421 }))).toEqual(overwrittenNextState);
    expect(reducer(nextState, changeFilters({ name: 'John' }))).toEqual(extendedNextState);
  });

  it('should handle CHANGE_FILTER action', () => {
    const reducer = handleFilters('X');
    const { changeFilter } = FiltersAction.create('X');
    const prevState = {};
    const nextState: Filters = { id: 124 };
    const overwriteNextState: Filters = { id: 421 };
    const extendedNextState: Filters = { id: 124, name: 'John' };

    expect(reducer(prevState, changeFilter('id', 124))).toEqual(nextState);
    expect(reducer(nextState, changeFilter('id', 421))).toEqual(overwriteNextState);
    expect(reducer(nextState, changeFilter('name', 'John'))).toEqual(extendedNextState);
  });

  it('should handle REMOVE_FILTER action', () => {
    const reducer = handleFilters('X');
    const { removeFilter } = FiltersAction.create('X');
    const prevState: Filters = { id: 124 };
    const nextState: Filters = {};

    expect(reducer(prevState, removeFilter('id'))).toEqual(nextState);
    expect(reducer(prevState, removeFilter('name'))).toEqual(prevState);
  });
});
