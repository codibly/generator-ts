import { PageContainer } from 'App/component/Page/PageContainer/PageContainer';
import { PageHeader } from 'App/component/Page/PageHeader/PageHeader';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { ChangePasswordDialog } from './ChangePasswordDialog/ChangePasswordDialog';
import { UserCard } from './UserCard/UserCard';
import { UserToolbar } from './UserToolbar/UserToolbar';

export namespace UserPage {
  export type StateProps = {};
  export type OwnProps = {};
  export type Props = StateProps & OwnProps;
}

export const UserPage: FunctionComponent<UserPage.Props> = () => (
  <PageContainer>
    <PageHeader variant="h4">User profile</PageHeader>
    <UserToolbar />
    <UserCard />
    <ChangePasswordDialog />
  </PageContainer>
);
