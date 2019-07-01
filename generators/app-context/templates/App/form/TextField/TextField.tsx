import { fieldToTextField } from '@codibly/formik-material-ui/TextField';
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';
import {
  DefaultTextField,
  defaultTextFieldToTextField
} from 'App/component/DefaultTextField/DefaultTextField';
import { Field, FieldConfig, FieldProps } from 'formik';
import * as React from 'react';
import { FunctionComponent } from 'react';

export namespace TextField {
  export type Props = FieldConfig & TextFieldProps;
}

const FormikTextField = (props: DefaultTextField.Props & FieldProps) => {
  const { value, ...fieldProps } = fieldToTextField(defaultTextFieldToTextField(props) as any);

  // to prevent uncontrolled to controlled input transition error,
  // we need to defined default values as empty string, not null or undefined
  return <MuiTextField {...fieldProps} value={value || ''} />;
};

export const TextField: FunctionComponent<TextField.Props> = (props) => (
  <Field component={FormikTextField} {...props} />
);
