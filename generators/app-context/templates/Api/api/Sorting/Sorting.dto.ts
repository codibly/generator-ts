/**
 * Describes how to sort resource by API
 */
export type SortingDto = {
  field: string;
  direction: SortingDto.Direction;
};

export namespace SortingDto {
  export type Direction = 'asc' | 'desc';
}
