import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField';
import { FieldProps, getIn } from 'formik';
import * as React from 'react';
import { Omit } from 'utility-types';
import { createFormikField } from '../../typed-formik';

export type TextFieldProps = FieldProps & Omit<MuiTextFieldProps, 'error' | 'name' | 'value'>;

export function fieldToTextField({
  field,
  form,
  variant,
  disabled = false,
  onChange,
  ...props
}: TextFieldProps): MuiTextFieldProps {
  const { name, value } = field;
  const { touched, errors, isSubmitting } = form;

  const fieldError = getIn(errors, name);
  const showError = getIn(touched, name) && !!fieldError;

  return {
    ...props,
    ...field,
    // Hack to work around type issue
    // See: https://github.com/Microsoft/TypeScript/issues/28791
    variant: variant as any,
    value: value || '',
    onChange: (event) => {
      field.onChange(event);

      if (onChange) {
        onChange(event);
      }
    },
    error: showError,
    helperText: showError ? fieldError : props.helperText,
    disabled: isSubmitting || disabled
  };
}

export const TextField = createFormikField((props: TextFieldProps & FieldProps) => (
  <MuiTextField {...fieldToTextField(props)} />
));
