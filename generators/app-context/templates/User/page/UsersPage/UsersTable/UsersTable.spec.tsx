import { renderInApp, RenderInAppResult } from 'App/test/renderInApp';
import * as React from 'react';
import '@testing-library/react/cleanup-after-each';
import { Pagination } from '@codibly/redux-query';
import { UserApiMock } from '../../../api/User/User.mock';
import { UserMapper } from '../../../api/User/User.mapper';
import { User } from '../../../model/User';
import { UsersTablePure } from './UsersTable';

describe('Users Table', () => {
  const users: User[] = [
    UserMapper.fromDto(UserApiMock.ADMIN)
  ];
  const pagination: Pagination.Statistics = {
    page: 1,
    perPage: 10,
    count: 10
  };
  const sorting = null;
  const filters = {};
  let onChangePage: jest.Mock;
  let onChangePerPage: jest.Mock;
  let onChangeSorting: jest.Mock;
  let onChangeFilters: jest.Mock;
  let rendered: RenderInAppResult;

  beforeEach(() => {
    onChangePage = jest.fn();
    onChangePerPage = jest.fn();
    onChangeSorting = jest.fn();
    onChangeFilters = jest.fn();

    rendered = renderInApp(
      <UsersTablePure
        users={users}
        loading={false}
        sorting={sorting}
        onChangeSorting={onChangeSorting}
        pagination={pagination}
        onChangePage={onChangePage}
        onChangePerPage={onChangePerPage}
        filters={filters}
        onChangeFilters={onChangeFilters}
      />
    );
  });

  it('should list users in table', async () => {
    expect(rendered.getByText('Robert DeFoe')).toBeTruthy();
    expect(rendered.getByText('admin@example.com')).toBeTruthy();
  });
});
