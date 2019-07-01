import { Omit } from '@material-ui/core';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import * as React from 'react';
import { ComponentClass, FunctionComponent, useEffect } from 'react';
import ErrorBoundary from 'react-error-boundary';
import { connect } from 'react-redux';
import { AppState } from '../../store/App.state';
import { DialogAction } from '@codibly/redux-dialog/Dialog.action';
import { DialogSelector } from '@codibly/redux-dialog/Dialog.selector';
import { DialogErrorFallbackLoadable } from '../Dialog/DialogErrorFallback/DialogErrorFallback.load';

export namespace ConnectedDialog {
  export type StateProps = {
    open: boolean;
    params: any;
  };
  export type DispatchProps = {
    onClose: () => void;
    onReopen: (params: any) => void;
  };
  export type OwnProps<TParams = any> = Omit<DialogProps, 'open'> & {
    name: string;
    children: DialogProps['children'] | ((params: TParams) => DialogProps['children']);
  };
  export type Props = StateProps & DispatchProps & OwnProps;
}

export const ConnectedDialogPure: FunctionComponent<ConnectedDialog.Props> = ({
  name,
  params,
  children,
  open,
  onClose,
  onReopen,
  ...dialogProps
}) => (
  <Dialog open={open} onClose={onClose} {...dialogProps}>
    <ErrorBoundary
      key={String(open)}
      FallbackComponent={() => (
        <DialogErrorFallbackLoadable
          name={name}
          onClose={onClose}
          onReopen={() => onReopen(params)}
        />
      )}
    >
      {open
        ? children instanceof Function
          ? children(params)
          : children
        : // we can't return null because of Dialog.PropTypes validation
          ''}
    </ErrorBoundary>
  </Dialog>
);

export const ConnectedDialog: ComponentClass<ConnectedDialog.OwnProps> = connect(
  (state: AppState, ownProps: ConnectedDialog.OwnProps): ConnectedDialog.StateProps => ({
    open: DialogSelector.isDialogOpen(ownProps.name)(state),
    params: DialogSelector.getDialogParams(ownProps.name)(state)
  }),
  (dispatch, { name }: ConnectedDialog.OwnProps): ConnectedDialog.DispatchProps => ({
    onClose: () => dispatch(DialogAction.closeDialog()),
    onReopen: (params: any) => {
      dispatch(DialogAction.closeDialog());
      // re-open in 100ms - use timeout in order to show user that it's reopened
      setTimeout(() => dispatch(DialogAction.openDialog(name, params)), 100);
    }
  })
)(ConnectedDialogPure);
