import { createAsyncActions } from '@codibly/redux-async';
import { SelectionAction } from './Selection.action';
import { handleSelection } from './Selection.reducer';
import { SelectionState } from './Selection.state';

describe('selectionReducer', () => {
  it('should create custom reducer for domain', () => {
    expect(handleSelection('X')).toBeDefined();
  });

  it('should handle undefined state', () => {
    const reducer = handleSelection('X');

    expect(reducer(undefined, { type: 'TEST' })).toEqual(SelectionState.INITIAL);
  });

  it('should handle CHANGE_SELECTION action', () => {
    const reducer = handleSelection<number>('X');
    const { changeSelection } = SelectionAction.create<number>('X');
    const selection = [3, 5, 2];
    const prevState = undefined;
    const nextState = selection;

    expect(reducer(prevState, changeSelection(selection))).toEqual(nextState);
    expect(reducer(nextState, changeSelection([]))).toEqual([]);
  });

  it('should handle async action', () => {
    const reducer = handleSelection<number>('X', 'SOME_ASYNC');
    const { resolved } = createAsyncActions('SOME_ASYNC');

    const prevState = [3, 5, 2];
    const nextState = [5, 2];

    // we should ignore perPage field
    expect(reducer(prevState, resolved({ data: [{ id: 5 }, { id: 2 }] }))).toEqual(nextState);
  });
});
