import { SwitchProps } from '@material-ui/core/Switch';
import { Field, FieldConfig } from 'formik';
import { Switch as FormikSwitch } from 'formik-material-ui';
import * as React from 'react';
import { FunctionComponent } from 'react';

export namespace Switch {
  export type Props = FieldConfig & SwitchProps;
}

export const Switch: FunctionComponent<Switch.Props> = (props) => (
  <Field component={FormikSwitch} {...props} />
);
