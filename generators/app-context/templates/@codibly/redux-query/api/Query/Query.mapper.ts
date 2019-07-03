import { Query } from '../../model/Query';
import { FilterMapper } from '../Filter/Filter.mapper';
import { PaginationMapper } from '../Pagination/Pagination.mapper';
import { SortingMapper } from '../Sorting/Sorting.mapper';
import { QueryDto } from './Query.dto';

export namespace QueryMapper {
  /**
   * Map list query to be able to send as GET query to the API
   */
  export function toDto(query: Query): QueryDto {
    const dto: QueryDto = {};

    if (query.filter) {
      dto.f = FilterMapper.toDto(query.filter);
    }

    if (query.pagination) {
      dto.p = PaginationMapper.toDto(query.pagination);
    }

    if (query.sorting) {
      dto.s = SortingMapper.toDto(query.sorting);
    }

    return dto;
  }
}
