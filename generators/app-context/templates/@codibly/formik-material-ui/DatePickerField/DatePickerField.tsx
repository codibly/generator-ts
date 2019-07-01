import { createFormikField } from '@codibly/typed-formik';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import DateIcon from '@material-ui/icons/DateRange';
import { FieldProps, getIn } from 'formik';
import { DatePicker } from 'material-ui-pickers';
import { DatePickerProps } from 'material-ui-pickers';
import * as React from 'react';

/**
 * Maps formik Field props to DatePicker props
 */
export function fieldToDatePicker({
  field,
  form,
  ...props
}: FieldProps & Partial<DatePickerProps>): DatePickerProps {
  const fieldError = getIn(form.errors, field.name);
  const showError = getIn(form.touched, field.name) && !!fieldError;

  const defaultProps = {
    clearable: true,
    disablePast: true,
    format: 'dd/MM/yyyy',
    helperText: showError ? fieldError : props.helperText,
    error: showError,
    mask: (value: any) => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : []),
    InputProps: {
      startAdornment: (
        <InputAdornment position="start">
          <DateIcon />
        </InputAdornment>
      )
    }
  };

  return {
    ...defaultProps,
    ...props,
    name: field.name,
    value: field.value,
    onError: (event: any, error: any) => form.setFieldError(field.name, error),
    onChange: (date) => form.setFieldValue(field.name, date, true),
    onBlur: () => form.setFieldTouched(field.name),
    onClose: () => form.setFieldTouched(field.name)
  };
}

export const DatePickerField = createFormikField((props: FieldProps & Partial<DatePickerProps>) => (
  <DatePicker {...fieldToDatePicker(props)} />
));
