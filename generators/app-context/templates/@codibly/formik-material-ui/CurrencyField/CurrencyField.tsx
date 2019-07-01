import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField';
import { FieldProps, getIn } from 'formik';
import * as React from 'react';
import { Omit } from 'utility-types';
import { useFormatNumber } from '../../react-intl-hook';
import { createFormikField } from '../../typed-formik';

export type TextFieldProps = FieldProps & Omit<MuiTextFieldProps, 'error' | 'name' | 'value'>;

function normalizeNumber(value: string): number | undefined {
  return !value ? undefined : Number(String(value).replace(/[^0-9.-]+/g, ''));
}

export function fieldToTextField({
  field,
  form,
  variant,
  disabled = false,
  onChange,
  onBlur,
  ...props
}: TextFieldProps): MuiTextFieldProps {
  const { name, value } = field;
  const { touched, errors, isSubmitting } = form;

  const fieldError = getIn(errors, name);
  const showError = getIn(touched, name) && !!fieldError;
  const formatNumber = useFormatNumber();

  return {
    ...props,
    ...field,
    // Hack to work around type issue
    // See: https://github.com/Microsoft/TypeScript/issues/28791
    variant: variant as any,
    value: !value && value !== 0 ? '' : formatNumber(value) || '',
    onBlur: (event) => {
      form.setFieldTouched(field.name, true);
      if (onBlur) {
        onBlur(event);
      }
    },
    onChange: (event) => {
      form.setFieldValue(field.name, normalizeNumber(event.target.value));
      if (onChange) {
        onChange(event);
      }
    },
    error: showError,
    helperText: showError ? fieldError : props.helperText,
    disabled: isSubmitting || disabled
  };
}

export const CurrencyField = createFormikField((props: TextFieldProps & FieldProps) => (
  <MuiTextField {...fieldToTextField(props)} />
));
