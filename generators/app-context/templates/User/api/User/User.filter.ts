import { FilterExpression } from 'Api/model/FilterExpression';

export namespace UserFilter {
  export const search = (query: string) =>
    FilterExpression.or(
      ['name', 'email'].map((field) => FilterExpression.like(field, query))
    );
}
