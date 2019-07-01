import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import * as React from 'react';
import { InputProps, RenderInputComponent } from 'react-autosuggest';
import { AutoSuggest } from './AutoSuggest';

/**
 * Maps AutoSuggest input props to Material UI Text Field props
 */
export function autoSuggestInputToTextField({
  inputRef,
  ref,
  ...props
}: InputProps<any>): TextFieldProps {
  return {
    ...(props as any),
    inputRef: (el: HTMLInputElement) => {
      ref(el);

      if (inputRef) {
        inputRef(el);
      }
    }
  };
}

export const rendertInputComponent: RenderInputComponent<AutoSuggest.Suggestion> = (props) => (
  <TextField {...autoSuggestInputToTextField(props)} />
);
