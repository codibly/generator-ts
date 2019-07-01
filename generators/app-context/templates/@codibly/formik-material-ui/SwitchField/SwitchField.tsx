import { SwitchField as MuiSwitchField } from '@codibly/material-ui/SwitchField';
import { createFormikField } from '@codibly/typed-formik';
import { Field, FieldConfig, FieldProps } from 'formik';
import { fieldToSwitch } from 'formik-material-ui';
import * as React from 'react';

export namespace SwitchField {
  export type Props = MuiSwitchField.Props & FieldConfig;
}

export const SwitchField = createFormikField((props: SwitchField.Props & FieldProps) => {
  // prevent changing from uncontrolled to controlled component
  const { value, checked, ...fieldProps } = fieldToSwitch(props);

  return <MuiSwitchField {...fieldProps} value={value || ''} checked={!!checked} />;
});
