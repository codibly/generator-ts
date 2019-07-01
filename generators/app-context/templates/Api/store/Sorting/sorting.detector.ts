import { changed } from 'redux-detector';
import { SortingState } from './Sorting.state';

export function changedSorting<TState = any>(selector: (state?: TState) => SortingState) {
  return changed(selector);
}
