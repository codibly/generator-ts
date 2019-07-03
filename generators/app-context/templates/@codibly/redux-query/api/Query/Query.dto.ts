import { FilterDto } from '../Filter/Filter.dto';
import { PaginationDto } from '../Pagination/Pagination.dto';
import { SortingDto } from '../Sorting/Sorting.dto';

export type QueryDto = {
  f?: FilterDto;
  p?: PaginationDto;
  s?: SortingDto;
};
