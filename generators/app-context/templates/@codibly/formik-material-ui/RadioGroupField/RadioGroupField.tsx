import { createFormikField } from '@codibly/typed-formik';
import MuiFormControl, {
  FormControlProps as MuiFormControlProps
} from '@material-ui/core/FormControl';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import MuiFormHelperText from '@material-ui/core/FormHelperText';
import MuiFormLabel from '@material-ui/core/FormLabel';
import MuiRadio from '@material-ui/core/Radio';
import MuiRadioGroup, { RadioGroupProps as MuiRadioGroupProps } from '@material-ui/core/RadioGroup';
import { FieldProps, getIn } from 'formik';
import * as React from 'react';
import { ReactNode } from 'react';
import { Omit } from 'utility-types';

type RadioGroupForwardedProps = Omit<MuiRadioGroupProps, 'name' | 'value' | 'onChange'>;
type RadioGroupFieldOption = {
  label: string;
  value: string;
};
export type RadioGroupFieldProps = Omit<MuiFormControlProps, 'children'> & {
  RadioGroupProps?: RadioGroupForwardedProps;
  label?: ReactNode;
  options: RadioGroupFieldOption[];
};

export function fieldToRadioGroup({
  field,
  form,
  ...props
}: FieldProps & RadioGroupForwardedProps): MuiRadioGroupProps {
  return {
    ...props,
    ...field
  };
}

export function fieldToFormControl({
  field,
  form,
  label,
  options,
  RadioGroupProps,
  ...props
}: FieldProps & RadioGroupFieldProps): MuiFormControlProps {
  const error = getIn(form.errors, field.name);
  const touched = getIn(form.touched, field.name);
  const hasError = !!(error && touched);

  return {
    ...props,
    error: hasError,
    children: (
      <>
        {label && <MuiFormLabel>{label}</MuiFormLabel>}
        <MuiRadioGroup {...fieldToRadioGroup({ ...(RadioGroupProps || {}), field, form })}>
          {options.map((option) => (
            <MuiFormControlLabel
              key={option.value}
              value={option.value}
              control={
                // there is a bug in RadioGroup implementation that leads to unpredictable behavior - that's
                // why we set checked value here (and use options props instead of children)
                <MuiRadio checked={String(option.value) === String(field.value)} />
              }
              label={option.label}
            />
          ))}
        </MuiRadioGroup>
        {/* it can be object if we have nested errors */}
        {hasError && typeof error === 'string' && <MuiFormHelperText>{error}</MuiFormHelperText>}
      </>
    )
  };
}

export const RadioGroupField = createFormikField((props: RadioGroupFieldProps & FieldProps) => (
  <MuiFormControl {...fieldToFormControl(props)} />
));
