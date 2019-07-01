import MuiSnackbar from '@material-ui/core/Snackbar';
import { closeSnackbar, getOpenedSnackbarId, getQueuedSnackbars, Snackbar } from '@rebean/snackbar';
import * as React from 'react';
import { ComponentClass, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from '../../store/Thunk.dispatch';

export namespace SnackbarPortal {
  export type StateProps = {
    queuedSnackbars: Snackbar[];
    openedSnackbarId?: Snackbar['id'];
  };
  export type DispatchProps = {
    onClose: (id: string) => void;
  };
  export type OwnProps = {};
  export type Props = StateProps & DispatchProps & OwnProps;
}

export const SnackbarPortalPure: FunctionComponent<SnackbarPortal.Props> = (props) => (
  <div>
    {props.queuedSnackbars.map((snackbar) => (
      <MuiSnackbar
        key={snackbar.id}
        message={snackbar.message}
        open={props.openedSnackbarId === snackbar.id}
      />
    ))}
  </div>
);

export const SnackbarPortal: ComponentClass<SnackbarPortal.OwnProps> = connect(
  (state): SnackbarPortal.StateProps => ({
    queuedSnackbars: getQueuedSnackbars(state),
    openedSnackbarId: getOpenedSnackbarId(state)
  }),
  (dispatch: ThunkDispatch): SnackbarPortal.DispatchProps => ({
    onClose: (id: string) => dispatch(closeSnackbar(id))
  })
)(SnackbarPortalPure) as ComponentClass<SnackbarPortal.OwnProps>;
