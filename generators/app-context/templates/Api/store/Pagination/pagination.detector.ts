import { changedAndTruthy, composeOr, mapDetector } from 'redux-detector';
import { PaginationState } from './Pagination.state';

export function changedPagination<TState = any>(selector: (state?: TState) => PaginationState) {
  return mapDetector(
    selector,
    composeOr(
      changedAndTruthy((pagination) => (pagination ? pagination.page : 0)),
      changedAndTruthy((pagination) => (pagination ? pagination.perPage : 0))
    )
  );
}
