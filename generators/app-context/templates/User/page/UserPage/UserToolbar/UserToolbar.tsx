import { Button } from '@material-ui/core';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import { DialogAction } from '@codibly/redux-dialog/Dialog.action';
import { CHANGE_PASSWORD_DIALOG } from '../ChangePasswordDialog/ChangePasswordDialog';
import { ToolbarContainer } from './UserToolbar.style';

export namespace UserToolbar {
  export type StateProps = {};
  export type DispatchProps = {
    onPasswordChange: () => void;
  };
  export type OwnProps = {};
  export type Props = StateProps & DispatchProps & OwnProps;
}

export const UserToolbarPure: FunctionComponent<UserToolbar.Props> = (props) => (
  <ToolbarContainer>
    <Button variant="contained" color="primary" onClick={props.onPasswordChange}>
      Change password
    </Button>
  </ToolbarContainer>
);

export const UserToolbar: ComponentClass<UserToolbar.OwnProps> = connect(
  (state): UserToolbar.StateProps => ({}),
  (dispatch): UserToolbar.DispatchProps => ({
    onPasswordChange: () => dispatch(DialogAction.openDialog(CHANGE_PASSWORD_DIALOG))
  })
)(UserToolbarPure);
