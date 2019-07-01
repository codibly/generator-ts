import { InputAdornment } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import { FunctionComponent } from 'react';
// TODO: use async-status library when it will be published
import { AsyncStatus } from '@codibly/redux-async/Async.state';
import { AutoSuggest } from '../AutoSuggest';

export namespace AsyncAutoSuggest {
  export type Props = AutoSuggest.Props & {
    status?: AsyncStatus;
    errorText?: string;
  };
}

/**
 * Maps @codibly/material-ui/AsyncAutoSuggest props to @codibly/material-ui/AutoSuggest props
 */
export function asyncAutoSuggestToAutoSuggest({
  status,
  error,
  errorText,
  helperText,
  ...props
}: AsyncAutoSuggest.Props): AutoSuggest.Props {
  const textFieldProps = props.TextFieldProps || {};
  const inputProps = textFieldProps.InputProps || {};

  return {
    ...props,
    error: status === AsyncStatus.REJECTED || error,
    helperText: status === AsyncStatus.REJECTED && errorText ? errorText : helperText,
    TextFieldProps: {
      ...textFieldProps,
      InputProps: {
        ...inputProps,
        endAdornment:
          status === AsyncStatus.PENDING ? (
            <InputAdornment position="end">
              <CircularProgress size={24} />
            </InputAdornment>
          ) : (
            inputProps.endAdornment
          )
      }
    }
  };
}

export const AsyncAutoSuggest: FunctionComponent<AsyncAutoSuggest.Props> = (props) => (
  <AutoSuggest {...asyncAutoSuggestToAutoSuggest(props)} />
);
