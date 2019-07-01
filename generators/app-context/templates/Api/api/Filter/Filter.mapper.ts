import { FilterExpression } from '../../model/FilterExpression';
import { FilterDto } from './Filter.dto';

export namespace FilterMapper {
  export function toDto(filter: FilterExpression): FilterDto {
    return JSON.stringify(filter);
  }
}
