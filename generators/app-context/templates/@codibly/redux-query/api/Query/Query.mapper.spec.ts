import { QueryMapper } from './Query.mapper';

describe('QueryMapper', () => {
  it('should map query model to query dto', () => {
    expect(
      QueryMapper.toDto({
        filter: {
          eq: [{ identifier: 'id' }, { literal: 'afef43-fcc5a3' }]
        },
        pagination: {
          page: 2,
          perPage: 7
        },
        sorting: {
          field: 'name',
          direction: 'asc'
        }
      })
    ).toMatchSnapshot();
  });
});
