import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { ErrorFallback } from '../../ErrorFallback/ErrorFallback';
import { ErrorFallbackAction } from '../../ErrorFallback/ErrorFallbackAction/ErrorFallbackAction';
import { ErrorFallbackContent } from '../../ErrorFallback/ErrorFallbackContent/ErrorFallbackContent';
import { ErrorFallbackTitle } from '../../ErrorFallback/ErrorFallbackTitle/ErrorFallbackTitle';

export namespace DialogErrorFallback {
  export type Props = {
    name: string;
    onReopen: () => void;
    onClose: () => void;
  };
}

export const DialogErrorFallback: FunctionComponent<DialogErrorFallback.Props> = ({
  onReopen,
  onClose
}) => (
  <>
    <DialogContent>
      <ErrorFallback>
        <ErrorFallbackTitle>Application error</ErrorFallbackTitle>
        <ErrorFallbackContent>
          An error occurred in the application and your dialog could not be displayed. Please, try
          to <ErrorFallbackAction onClick={onReopen}>reopen the modal</ErrorFallbackAction>
        </ErrorFallbackContent>
      </ErrorFallback>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </>
);
