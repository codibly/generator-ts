import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/Pageview';
import { openSnackbar } from '@rebean/snackbar';
import { DataTableBodyCellProps } from 'App/component/DataTable/DataTableBodyCell/DataTableBodyCell';
import { ActionsTableCell } from 'App/component/Table/ActionsTableCell/ActionsTableCell';
import { AppState } from 'App/store/App.state';
import { DialogAction } from '@codibly/redux-dialog/Dialog.action';
import { ThunkDispatch } from 'App/store/Thunk.dispatch';
import { FunctionComponent } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { User } from '../../../../model/User';
import { UserAction } from '../../../../store/User/User.action';
import { UserSelector } from '../../../../store/User/User.selector';
import { USER_FORM_DIALOG } from '../../UserFormDialog/UserFormDialog';
import { VIEW_USER_DIALOG } from '../../ViewUserDialog/ViewUserDialog';

export namespace ActionsCell {
  export type StateProps = {
    canEditUser: boolean;
  };
  export type OwnProps = DataTableBodyCellProps<User>;
  export type DispatchProps = {
    onViewUser: (user: User) => void;
    onEditUser: (user: User) => void;
    onResendEmail: (userId: string) => void;
  };
  export type Props = StateProps & OwnProps & DispatchProps;
}

export const ActionsCellPure: FunctionComponent<ActionsCell.Props> = ({
  data: user,
  onViewUser,
  onEditUser,
  onResendEmail,
  canEditUser,
  ...props
}) => (
  <ActionsTableCell {...props}>
    <div>
      <MenuItem onClick={() => onViewUser(user)}>
        <ListItemIcon>
          <ViewIcon />
        </ListItemIcon>{' '}
        View
      </MenuItem>
      {canEditUser && (
        <MenuItem onClick={() => onEditUser(user)}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>{' '}
          Edit
        </MenuItem>
      )}
    </div>
  </ActionsTableCell>
);

export const ActionsCell = connect(
  (state: AppState): ActionsCell.StateProps => ({
    canEditUser: UserSelector.canEditUser()(state)
  }),
  (dispatch: ThunkDispatch): ActionsCell.DispatchProps => ({
    onViewUser: (user: User) => dispatch(DialogAction.openDialog(VIEW_USER_DIALOG, { user })),
    onEditUser: (user: User) => dispatch(DialogAction.openDialog(USER_FORM_DIALOG, { user })),
    onResendEmail: async (userId: string) => {
      try {
        await dispatch(UserAction.resendEmail(userId));
        dispatch(openSnackbar('✔ Welcome email has been sent'));
      } catch (error) {
        dispatch(openSnackbar('Unknown error - please try again'));
      }
    }
  })
)(ActionsCellPure);
