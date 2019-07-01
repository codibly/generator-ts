import { fieldToTextField } from '@codibly/formik-material-ui/TextField';
import { createFormikField } from '@codibly/typed-formik';
import { Field, FieldConfig, FieldProps } from 'formik';
import * as React from 'react';
import { AsyncSelectField as MuiAsyncSelectField } from '../../component/AsyncSelectField/AsyncSelectField';

export namespace AsyncSelectField {
  export type Props = MuiAsyncSelectField.Props & FieldConfig;
}

export function fieldToAsyncSelectField(
  props: MuiAsyncSelectField.Props & FieldProps
): MuiAsyncSelectField.Props {
  // variant typings bug
  return fieldToTextField(props as any);
}

export const AsyncSelectField = createFormikField(
  (props: MuiAsyncSelectField.Props & FieldProps) => (
    <MuiAsyncSelectField {...fieldToAsyncSelectField(props)} />
  )
);
