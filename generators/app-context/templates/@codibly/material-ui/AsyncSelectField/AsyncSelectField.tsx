import { InputAdornment, MenuItem } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DefaultTextField } from '../DefaultTextField/DefaultTextField';
import { AsyncStatus } from '@codibly/redux-async/Async.state';
import * as React from 'react';
import { FunctionComponent, ReactNode } from 'react';

export namespace AsyncSelectField {
  export type Props = DefaultTextField.Props & {
    status?: AsyncStatus;
    loadingText?: string;
    loadingErrorText?: string;
    loadingErrorHelperText?: string;
  };
}

export function asyncSelectFieldToTextField({
  children,
  status,
  loadingText,
  loadingErrorText,
  loadingErrorHelperText,
  ...props
}: AsyncSelectField.Props): DefaultTextField.Props {
  let menuItems: ReactNode;

  switch (status) {
    case AsyncStatus.PENDING:
      menuItems = [
        <MenuItem key="loading" value="" disabled>
          {loadingText || 'Loading...'}
        </MenuItem>
      ];
      break;

    case AsyncStatus.REJECTED:
      menuItems = [
        <MenuItem key="loadingError" value="" disabled>
          {loadingErrorText || 'Loading error'}
        </MenuItem>
      ];
      break;

    case AsyncStatus.RESOLVED:
    default:
      menuItems = children;
      break;
  }

  const selectProps = props.SelectProps || {};
  const inputProps = props.InputProps || {};

  return {
    ...props,
    disabled: props.disabled || status !== AsyncStatus.RESOLVED,
    error: props.error || status === AsyncStatus.REJECTED,
    helperText:
      status === AsyncStatus.REJECTED
        ? loadingErrorHelperText || props.helperText
        : props.helperText,
    select: true,
    SelectProps: {
      ...selectProps,
      displayEmpty: true
    },
    InputProps: {
      ...inputProps,
      startAdornment:
        status === AsyncStatus.PENDING ? (
          <InputAdornment position="start">
            <CircularProgress size={24} color="inherit" />
          </InputAdornment>
        ) : (
          inputProps.endAdornment
        )
    },
    children: menuItems
  };
}

export const AsyncSelectField: FunctionComponent<AsyncSelectField.Props> = (props) => (
  <DefaultTextField {...asyncSelectFieldToTextField(props)} />
);
