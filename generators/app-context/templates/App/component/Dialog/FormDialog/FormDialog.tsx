import * as React from 'react';
import { FunctionComponent } from 'react';
import { ConnectedDialog } from '../../ConnectedDialog/ConnectedDialog';

export namespace FormDialog {
  export type Props = ConnectedDialog.OwnProps;
}

export const FormDialog: FunctionComponent<FormDialog.Props> = (props: any) => (
  <ConnectedDialog fullWidth disableBackdropClick disableEscapeKeyDown {...props} />
);
