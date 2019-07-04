import { Paper, WithStyles, withStyles } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import { TextFieldProps } from '@material-ui/core/TextField';
import * as React from 'react';
import { ReactNode, useState } from 'react';
import ReactAutoSuggest, { AutosuggestProps as ReactAutoSuggestProps } from 'react-autosuggest';
import { Omit } from 'utility-types';
import { styles } from './AutoSuggest.style';
import { getSuggestionValue } from './getSuggestionValue';
import { renderSuggestion } from './renderSuggestion';
import { renderSuggestionsContainer } from './renderSuggestionsContainer';
import { rendertInputComponent } from './rendertInputComponent';

export namespace AutoSuggest {
  export type Suggestion = {
    label: ReactNode;
    value: string | number;
    data?: any;
  };

  // these props have default values in autoSuggestToReactAutoSuggest function
  type PartialProps =
    | 'theme'
    | 'renderInputComponent'
    | 'renderSuggestion'
    | 'renderSuggestionsContainer'
    | 'getSuggestionValue'
    | 'inputProps';

  // these are common props mapped from TextField for better development experience
  type TextFieldMappedProps =
    | 'disabled'
    | 'error'
    | 'fullWidth'
    | 'helperText'
    | 'label'
    | 'margin'
    | 'placeholder'
    | 'required'
    | 'type'
    | 'variant'
    | 'value'
    | 'name'
    | 'onChange'
    | 'onBlur';

  export type Props = Omit<ReactAutoSuggestProps<Suggestion>, PartialProps> &
    Partial<Pick<ReactAutoSuggestProps<Suggestion>, PartialProps>> &
    Partial<Pick<TextFieldProps, TextFieldMappedProps>> & {
      // pass additional TextField props
      TextFieldProps?: Partial<Omit<TextFieldProps, TextFieldMappedProps>>;
    };
}

/**
 * Maps @codibly/material-ui/AutoSuggest props to react-autosuggest props
 */
export function autoSuggestToReactAutoSuggest(
  {
    renderInputComponent: customRenderInputComponent,
    renderSuggestion: customRenderSuggestion,
    renderSuggestionsContainer: customRenderSuggestionsContainer,
    getSuggestionValue: customGetSuggestionValue,
    TextFieldProps: textFieldProps,
    disabled,
    error,
    fullWidth,
    helperText,
    label,
    margin,
    name,
    placeholder,
    required,
    type,
    variant,
    value,
    onChange,
    onBlur,
    ...props
  }: AutoSuggest.Props,
  [popperNode, setPopperNode]: [HTMLElement | undefined, (el: HTMLElement | undefined) => void]
): ReactAutoSuggestProps<AutoSuggest.Suggestion> {
  return {
    ...props,
    renderInputComponent: customRenderInputComponent || rendertInputComponent,
    renderSuggestion: customRenderSuggestion || renderSuggestion,
    renderSuggestionsContainer: (params) => (
      <Popper
        anchorEl={popperNode}
        placement="bottom-start"
        open={Boolean(params.children)}
        style={{ zIndex: 10000 }}
      >
        {(customRenderSuggestionsContainer || renderSuggestionsContainer)(params)}
      </Popper>
    ),
    getSuggestionValue: customGetSuggestionValue || getSuggestionValue,
    inputProps: {
      ...(textFieldProps || {}),
      disabled,
      error,
      fullWidth,
      helperText,
      label,
      margin,
      name,
      placeholder,
      required,
      type,
      variant,
      inputRef: setPopperNode,
      defaultValue: undefined,
      value: (value as string) || '',
      onChange: (event: React.ChangeEvent<any> | React.MouseEvent<any>) => {
        if (onChange && event.type === 'change') {
          // react-autosuggest dispatches 'click' event which should not be passed to the TextField component
          onChange(event as React.ChangeEvent<any>);
        }
      },
      onBlur
    }
  };
}

export const AutoSuggest = withStyles(styles)(
  ({ classes, theme, ...props }: AutoSuggest.Props & WithStyles) => {
    const [popperNode, setPopperNode] = useState<HTMLElement | undefined>(undefined);

    return (
      <ReactAutoSuggest
        {...autoSuggestToReactAutoSuggest(props, [popperNode, setPopperNode])}
        theme={{
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
          ...(theme || {})
        }}
      />
    );
  }
);
