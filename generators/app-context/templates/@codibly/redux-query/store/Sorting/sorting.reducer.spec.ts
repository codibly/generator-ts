import { Sorting } from '../../model/Sorting';
import { SortingAction } from './Sorting.action';
import { handleSorting } from './sorting.reducer';
import { SortingState } from './Sorting.state';

describe('sortingReducer', () => {
  it('should create custom reducer for domain', () => {
    expect(handleSorting('X')).toBeDefined();
  });

  it('should handle undefined state', () => {
    const reducer = handleSorting('X');

    expect(reducer(undefined, { type: 'TEST' })).toEqual(SortingState.INITIAL);
  });

  it('should handle CHANGE_FILTER action', () => {
    const reducer = handleSorting('X');
    const { changeSorting } = SortingAction.create('X');
    const sorting: Sorting = {
      field: 'name',
      direction: 'desc'
    };
    const prevState = null;
    const nextState = sorting;

    expect(reducer(prevState, changeSorting(sorting))).toEqual(nextState);
    expect(reducer(nextState, changeSorting(null))).toEqual(null);
  });
});
