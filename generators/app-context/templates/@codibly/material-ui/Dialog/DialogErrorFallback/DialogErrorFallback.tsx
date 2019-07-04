import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import * as React from 'react';
import { FunctionComponent } from 'react';
export namespace DialogErrorFallback {
  export type Props = {
    name: string;
    onReopen: () => void;
    onClose: () => void;
    renderContent: (onReopen) => React.ReactElement;
  };
}

export const DialogErrorFallback: FunctionComponent<DialogErrorFallback.Props> = ({
  onReopen,
  onClose,
  renderContent
}) => (
  <>
    <DialogContent>
      { renderContent && renderContent(onReopen) }
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </>
);
