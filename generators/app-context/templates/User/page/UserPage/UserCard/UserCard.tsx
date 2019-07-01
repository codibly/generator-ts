import * as React from 'react';
import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Info } from 'App/component/Info/Info';
import { AppState } from 'App/store/App.state';
import { AuthSelector } from 'Auth/store/Auth/Auth.selector';
import { User } from '../../../model/User';
import { UserCardData } from './UserCard.data';
import { CardContainer } from './UserCard.style';

export namespace UserCard {
  export type StateProps = {
    user: User | null;
  };
  export type OwnProps = {};
  export type Props = StateProps & OwnProps;
}

export const UserCardPure: FunctionComponent<UserCard.Props> = ({ user }) => (
  <CardContainer>
    <Info info={user ? UserCardData.info(user) : []} />
  </CardContainer>
);

export const UserCard = connect(
  (state: AppState): UserCard.StateProps => ({
    user: AuthSelector.getMyself(state)
  })
)(UserCardPure);
