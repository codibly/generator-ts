import { fieldToTextField } from '@codibly/formik-material-ui/TextField';
import { AutoSuggest } from '../AutoSuggest';
import { FieldConfig, FieldProps } from 'formik';
import * as React from 'react';
import { SuggestionSelectedEventData } from 'react-autosuggest';
import { Omit } from 'utility-types';
import { createFormikField } from '@codibly/typed-formik';

export namespace AutoSuggestField {
  export type OwnProps = Omit<AutoSuggest.Props, 'onSuggestionSelected'> & {
    // extend onSuggestionSelected
    onSuggestionSelected: (
      event: React.FormEvent<any>,
      data: SuggestionSelectedEventData<AutoSuggest.Suggestion>,
      props: FieldProps
    ) => void;
  };
  export type Props = FieldConfig & OwnProps;
}

export function fieldToAutoSuggest({
  field,
  form,
  onSuggestionSelected,
  ...props
}: FieldProps & AutoSuggestField.OwnProps): AutoSuggest.Props {
  return {
    ...props,
    ...(fieldToTextField({ field, form, ...props } as any) as any),
    onSuggestionSelected: (event, data) => {
      if (onSuggestionSelected) {
        onSuggestionSelected(event, data, { field, form });
      }
    }
  };
}

export const AutoSuggestField = createFormikField((props: AutoSuggestField.Props & FieldProps) => (
  <AutoSuggest {...fieldToAutoSuggest(props)} />
));
