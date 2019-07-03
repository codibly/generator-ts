import { Pagination } from './Pagination';
import { Sorting } from './Sorting';
import {Filters} from "./Filters";

export type Query = {
  filter?: Filters | null;
  pagination?: Pagination;
  sorting?: Sorting | null;
};
