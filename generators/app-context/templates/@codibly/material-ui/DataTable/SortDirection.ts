export type SortDirection = 'asc' | 'desc';

export namespace SortDirection {
  export function isValid(direction: any): direction is SortDirection {
    return direction === 'asc' || direction === 'desc';
  }

  export function flip(direction: SortDirection | undefined): SortDirection {
    return direction === 'asc' ? 'desc' : 'asc';
  }
}
