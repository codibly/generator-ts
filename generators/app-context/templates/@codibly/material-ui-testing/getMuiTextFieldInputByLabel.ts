import { prettyDOM, queryByText } from '@testing-library/react';

export function getMuiTextFieldInputByLabel(label: string, container = document.body): HTMLElement {
  const labelEl = queryByText(container, label) as HTMLElement;

  if (!labelEl) {
    throw new Error(`Cannot find Material UI text field by label "${label}".`);
  }

  const textFieldEl = labelEl.parentElement as HTMLElement;
  const inputEl = textFieldEl.querySelector('[name]') as HTMLInputElement;

  if (!inputEl) {
    throw new Error(
      `Cannot find Material UI text field by label "${label}".
      We found "${label}" text but there was no input with name attribute.
      ${prettyDOM(labelEl)}`
    );
  }

  return inputEl;
}
