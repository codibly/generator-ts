import { FilterDto } from './Filter.dto';

export namespace FilterMapper {
  export function toDto(filter): FilterDto {
    return JSON.stringify(filter);
  }
}
