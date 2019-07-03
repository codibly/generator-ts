import { Sorting } from '../../model/Sorting';
import { SortingDto } from './Sorting.dto';

export namespace SortingMapper {
  export function toDto(sorting: Sorting): SortingDto {
    // we keep model and DTO in sync - just in case for future changes and consistency
    return sorting;
  }
}
