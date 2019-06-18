import { mockOnGet } from '@codibly/axios-mock-utils';
import MockAdapter from 'axios-mock-adapter';

import { <%= name %>Dto } from './<%= name %>.dto';

export namespace <%= name %>Mock {

  export const <%= nameUpperCase %>_LIST: <%= name %>Dto.List = {
    data: [],
    meta: { pagination: { index: 1, size: 1, count: 1 }}
  };

  export const <%= nameUpperCase %>_GET: <%= name %>Dto.Get = {
    id: '539f33e2-5a95-460b-8961-51fa2491097f'
  };

  export const <%= nameUpperCase %>_UPDATE: <%= name %>Dto.Update = { };

  export function mockGet(mock: MockAdapter) {
    mockOnGet(mock, '/api/<%= nameCamelCase %>/:id', <%= nameUpperCase %>_LIST.data);
  }

  export function mockList(mock: MockAdapter, status = 200, data = <%= nameUpperCase %>_LIST) {
    mock.onGet('/api/<%= nameCamelCase %>').reply(status, data);
  }

  export function mockCreate(mock: MockAdapter, status = 200, id = '539f33e2-5a95-460b-8961-51fa2491097f') {
    mock.onPost('/api/<%= nameCamelCase %>').reply(({ data }) => [status, { ...(data || {}), id }]);
  }

  export function mockUpdate(mock: MockAdapter, status = 200) {
    mock.onPut('/api/<%= nameCamelCase %>/:id', <%= nameUpperCase %>_UPDATE).reply(({ data }) => [status, data]);
  }

  export function mockRemove(mock: MockAdapter, status = 200) {
    mock.onDelete('/api/<%= nameCamelCase %>/:id').reply(status);
  }

  export function mockAll(mock: MockAdapter) {
    mockGet(mock);
    mockList(mock);
    mockCreate(mock);
    mockUpdate(mock);
    mockRemove(mock);
  }

}
