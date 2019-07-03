import { Omit } from '@material-ui/core';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import * as React from 'react';
import { FunctionComponent } from 'react';

export namespace DefaultTextField {
  export type Props = Omit<TextFieldProps, 'variant'> & {
    variant?: TextFieldProps['variant'];
  };
}

export function defaultTextFieldToTextField(props: TextFieldProps): TextFieldProps {
  return {
    ...props,
    // variant as any - TypeScript bug
    variant: 'outlined' as any,
    margin: 'dense',
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
      ...(props.InputLabelProps || {})
    }
  };
}

export const DefaultTextField: FunctionComponent<DefaultTextField.Props> = (props) => (
  <TextField {...defaultTextFieldToTextField(props)} />
);
