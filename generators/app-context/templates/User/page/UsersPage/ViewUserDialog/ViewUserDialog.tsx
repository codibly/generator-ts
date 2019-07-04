import { DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import UserIcon from '@material-ui/icons/People';
import { ConnectedDialog, DialogIconTitle } from '@codibly/material-ui';
import { Info } from 'App/component/Info/Info';
import { AppState } from 'App/store/App.state';
import { DialogAction } from '@codibly/redux-dialog/Dialog.action';
import { DialogSelector } from '@codibly/redux-dialog/Dialog.selector';
import { ThunkDispatch } from 'App/store/Thunk.dispatch';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { User } from '../../../model/User';
import { UserInfoDialogData } from './ViewUserDialog.data';

export namespace UserInfoDialog {
  export type StateProps = {
    user: User;
  };
  export type OwnProps = {};
  export type DispatchProps = {
    onClose: () => void;
  };
  export type Props = StateProps & OwnProps & DispatchProps;
}

export const UserInfoDialogPure: FunctionComponent<UserInfoDialog.Props> = ({ user, onClose }) => (
  <ConnectedDialog name={VIEW_USER_DIALOG}>
    <DialogIconTitle label="User details" icon={UserIcon} />
    <DialogContent>
      <Info info={user ? UserInfoDialogData.info(user) : []} />
    </DialogContent>

    <DialogActions>
      <Button color="secondary" onClick={onClose}>
        Close
      </Button>
    </DialogActions>
  </ConnectedDialog>
);

export const VIEW_USER_DIALOG = 'VIEW_USER_DIALOG';
export const ViewUserDialog = connect(
  (state: AppState): UserInfoDialog.StateProps => ({
    user: DialogSelector.getDialogParam(VIEW_USER_DIALOG, 'user')(state)
  }),
  (dispatch: ThunkDispatch): UserInfoDialog.DispatchProps => ({
    onClose: () => dispatch(DialogAction.closeDialog())
  })
)(UserInfoDialogPure);
