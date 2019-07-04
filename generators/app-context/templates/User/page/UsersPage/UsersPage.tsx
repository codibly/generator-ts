import { PageContainer } from 'App/component/Page/PageContainer/PageContainer';
import { PageHeader } from 'App/component/Page/PageHeader/PageHeader';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { UserFormDialog } from './UserFormDialog/UserFormDialog';
import { UsersTable } from './UsersTable/UsersTable';
import { ViewUserDialog } from './ViewUserDialog/ViewUserDialog';

export namespace UsersPage {
  export type StateProps = {};
  export type OwnProps = {};
  export type Props = StateProps & OwnProps;
}

export const UsersPage: FunctionComponent<UsersPage.Props> = () => (
  <PageContainer>
    <PageHeader variant="h4">Manage users</PageHeader>
    <UsersTable />
    <UserFormDialog />
    <ViewUserDialog />
  </PageContainer>
);
