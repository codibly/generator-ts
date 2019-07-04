import { FormControlLabel } from '@material-ui/core';
import { FormControlLabelProps } from '@material-ui/core/FormControlLabel';
import Switch, { SwitchProps } from '@material-ui/core/Switch';
import * as React from 'react';
import { FunctionComponent } from 'react';

export namespace SwitchField {
  export type Props = SwitchProps & {
    label?: string;
    enabledLabel?: string;
    disabledLabel?: string;
    FormControlLabelProps?: FormControlLabelProps;
  };
}

export const SwitchField: FunctionComponent<SwitchField.Props> = ({
  enabledLabel,
  disabledLabel,
  FormControlLabelProps: formControlLabelProps,
  ...props
}) => (
  <FormControlLabel
    {...formControlLabelProps || {}}
    control={<Switch {...props} />}
    label={!!props.checked ? enabledLabel || props.label : disabledLabel || props.label}
  />
);
