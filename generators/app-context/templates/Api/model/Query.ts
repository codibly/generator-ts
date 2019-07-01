import { FilterExpression } from './FilterExpression';
import { Pagination } from './Pagination';
import { Sorting } from './Sorting';

export type Query = {
  filter?: FilterExpression | null;
  pagination?: Pagination;
  sorting?: Sorting | null;
};
