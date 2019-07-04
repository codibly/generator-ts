import { AsyncAutoSuggest } from '@codibly/material-ui/AsyncAutoSuggest';
import { FieldConfig, FieldProps } from 'formik';
import * as React from 'react';
import { Subtract } from 'utility-types';
import { AutoSuggest } from '../../material-ui/AutoSuggest';
import { createFormikField } from '@codibly/typed-formik';
import { AutoSuggestField, fieldToAutoSuggest } from '../AutoSuggestField/AutoSuggestField';

export namespace AsyncAutoSuggestField {
  export type OwnProps = AutoSuggestField.OwnProps &
    Subtract<AsyncAutoSuggest.Props, AutoSuggest.Props>;
  export type Props = FieldConfig & OwnProps;
}

export const AsyncAutoSuggestField = createFormikField(
  (props: AsyncAutoSuggestField.OwnProps & FieldProps) => (
    <AsyncAutoSuggest {...fieldToAutoSuggest(props)} />
  )
);
