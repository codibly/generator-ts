import { Pagination } from '../../model/Pagination';
import { PaginationDto } from './Pagination.dto';

export namespace PaginationMapper {
  export function toDto(pagination: Pagination): PaginationDto {
    return {
      index: pagination.page,
      size: pagination.perPage
    };
  }

  export function fromStatisticsDto(dto: PaginationDto.Statistics): Pagination.Statistics {
    return {
      page: dto.pageIndex || 1,
      perPage: dto.pageCount || Number.POSITIVE_INFINITY,
      count: dto.itemCount || undefined
    };
  }
}
