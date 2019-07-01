import * as React from 'react';
import { ComponentType, FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import { User } from 'User/model/User';
import { AuthSelector } from '../../store/Auth/Auth.selector';

export namespace MyselfConsumer {
  export type StateProps = {
    myself: User | null;
  };
  export type DispatchProps = {};
  export type OwnProps = {
    children: (myself: User | null) => ReactElement<any>;
  };
  export type Props = StateProps & DispatchProps & OwnProps;
}

const MyselfConsumerDumb: FunctionComponent<MyselfConsumer.Props> = ({ children, myself }) =>
  children(myself);

export const MyselfConsumer: ComponentType<MyselfConsumer.OwnProps> = connect(
  (state): MyselfConsumer.StateProps => ({
    myself: AuthSelector.getMyself(state)
  })
)(MyselfConsumerDumb);
