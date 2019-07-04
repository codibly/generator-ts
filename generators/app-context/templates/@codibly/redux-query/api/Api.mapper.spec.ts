import { AxiosResponse } from 'axios';
import { ApiMapper } from './Api.mapper';

describe('ApiMapper', () => {
  function createResponse(data: any, status = 200, statusText = 'OK'): AxiosResponse {
    return {
      data,
      status,
      statusText,
      config: {},
      headers: {}
    };
  }

  it('should handle pagination metadata response', () => {
    const response: AxiosResponse = createResponse({
      data: [1, 2, 3],
      meta: {
        pagination: {
          pageIndex: 1,
          pageCount: 10,
          itemCount: 120
        }
      }
    });
    const squareMapper = (x: number) => Math.pow(x, 2);
    const paginatedResponseMapper = ApiMapper.mapPaginatedResponse(squareMapper);

    const { data, pagination } = paginatedResponseMapper(response);

    expect(data).toEqual([1, 4, 9]);
    expect(pagination).toEqual({
      page: 1,
      perPage: 10,
      count: 120
    });
  });

  it('should handle empty pagination metadata response', () => {
    const response: AxiosResponse = createResponse({ data: [1, 2, 3] });
    const squareMapper = (x: number) => Math.pow(x, 2);
    const paginatedResponseMapper = ApiMapper.mapPaginatedResponse(squareMapper);

    const { data, pagination } = paginatedResponseMapper(response);

    expect(data).toEqual([1, 4, 9]);
    expect(pagination).toEqual({
      page: 1,
      perPage: Number.POSITIVE_INFINITY,
      count: undefined
    });
  });
});
