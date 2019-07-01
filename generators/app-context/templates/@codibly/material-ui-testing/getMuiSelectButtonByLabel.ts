import { prettyDOM } from '@testing-library/react';
import { getMuiSelectByLabel } from './getMuiSelectByLabel';

export function getMuiSelectButtonByLabel(label: string, container = document.body): HTMLElement {
  const selectEl = getMuiSelectByLabel(label, container);
  const buttonEl = selectEl.querySelector('[role="button"]') as HTMLDivElement;

  if (!buttonEl) {
    throw new Error(
      `Cannot find Material UI select by label "${label}".
      We found "${label}" text but there is no div with tabindex attribute.
      ${prettyDOM(selectEl)}`
    );
  }

  return buttonEl;
}
