import { getByText, prettyDOM } from '@testing-library/react';

export function getMuiRadioOrCheckboxLabelByText(
  text: string,
  container = document.body
): HTMLElement {
  const spanEl = getByText(container, text);
  const labelEl = spanEl.parentNode as HTMLElement;

  if (!(labelEl instanceof HTMLLabelElement)) {
    throw new Error(
      `Cannot find Material UI radio label "${text}".
      We found "${text}" text but its parent is not a label element
      ${prettyDOM(labelEl)}`
    );
  }

  return labelEl;
}
