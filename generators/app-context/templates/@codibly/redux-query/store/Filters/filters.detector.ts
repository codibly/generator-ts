import { changed } from 'redux-detector';
import { FiltersState } from './Filters.state';

export function changedFilters<TState = any>(selector: (state?: TState) => FiltersState) {
  return changed(selector);
}
