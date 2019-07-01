import { Filters } from 'Api/model/Filters';
import { DataTable } from 'App/component/DataTable/DataTable';
import { AppState } from 'App/store/App.state';
import { AsyncSelector } from '@codibly/redux-async/Async.selector';
import { FunctionComponent } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { Pagination } from '../../../../Api/model/Pagination';
import { Sorting } from '../../../../Api/model/Sorting';
import { User } from '../../../model/User';
import { UserAction } from '../../../store/User/User.action';
import { UserSelector } from '../../../store/User/User.selector';
import { UsersTableData } from './UsersTable.data';
import { TableContainer } from './UsersTable.style';

export namespace UsersTable {
  export type StateProps = {
    users: User[];
    sorting: Sorting | null;
    pagination: Pagination.Statistics;
    filters: Filters;
    loading: boolean;
  };
  export type DispatchProps = {
    onChangeSorting: (sorting: Sorting | null) => void;
    onChangePage: (page: number) => void;
    onChangePerPage: (perPage: number) => void;
    onChangeFilters: (filters: Filters) => void;
  };
  export type OwnProps = {};
  export type Props = StateProps & DispatchProps & OwnProps;
}

export const UsersTablePure: FunctionComponent<UsersTable.Props> = (props) => (
  <TableContainer>
    <DataTable
      columns={UsersTableData.columns}
      data={props.users}
      loading={props.loading}
      sorting={props.sorting}
      onChangeSorting={props.onChangeSorting}
      pagination={props.pagination}
      onChangePage={props.onChangePage}
      onChangePerPage={props.onChangePerPage}
      filters={props.filters}
      onChangeFilters={props.onChangeFilters}
    />
  </TableContainer>
);

export const UsersTable = connect(
  (state: AppState): UsersTable.StateProps => ({
    users: UserSelector.getUsers(state),
    sorting: UserSelector.getSorting(state),
    pagination: UserSelector.getPagination(state),
    filters: UserSelector.getFilters(state),
    loading: AsyncSelector.isPending(UserAction.LIST_USERS)(state)
  }),
  (dispatch): UsersTable.DispatchProps => ({
    onChangeSorting: (sorting) => dispatch(UserAction.changeSorting(sorting)),
    onChangePage: (page) => dispatch(UserAction.changePage(page)),
    onChangePerPage: (perPage) => dispatch(UserAction.changePerPage(perPage)),
    onChangeFilters: (filters) => dispatch(UserAction.changeFilters(filters))
  })
)(UsersTablePure);
