import { ApiDto } from '../api/Api.dto';
import { SortingDto } from '../api/Sorting/Sorting.dto';

// we keep model and DTO in sync
export type Sorting = SortingDto;

export namespace Sorting {
  export type Direction = SortingDto.Direction;

  export function flipDirection(direction: Direction | undefined): Direction {
    return direction === 'asc' ? 'desc' : 'asc';
  }

  /**
   * Flip existing sorting direction
   */
  export function flip<T extends Sorting | null>(sorting: T): T {
    return sorting
      ? ({ field: sorting.field, direction: flipDirection(sorting.direction) } as T)
      : (null as T);
  }

  /**
   * Create sorting object based on field and direction (by default asc)
   */
  export function create(field: string, direction: Direction = 'asc'): Sorting {
    return { field, direction };
  }
}
