import { Sorting } from '../../model/Sorting';

export type SortingState = Sorting | null;

export namespace SortingState {
  export const INITIAL: SortingState = null;
}
