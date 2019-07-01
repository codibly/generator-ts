import { createFormikField } from '@codibly/typed-formik';
import MuiCheckbox, { CheckboxProps as MuiChecbkoxProps } from '@material-ui/core/Checkbox';
import { Field, FieldConfig, FieldProps } from 'formik';
import { fieldToCheckbox } from 'formik-material-ui';
import * as React from 'react';

export namespace CheckboxField {
  export type Props = MuiChecbkoxProps & FieldConfig;
}

export const CheckboxField = createFormikField((props: CheckboxField.Props & FieldProps) => {
  // prevent changing from uncontrolled to controlled component
  const { value, checked, ...fieldProps } = fieldToCheckbox(props);

  return <MuiCheckbox {...fieldProps} value={value || ''} checked={!!checked} />;
});
