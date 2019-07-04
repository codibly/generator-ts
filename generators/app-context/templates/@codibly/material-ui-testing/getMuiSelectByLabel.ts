import { queryByText } from '@testing-library/react';

export function getMuiSelectByLabel(label: string, container = document.body): HTMLElement {
  const labelEl = queryByText(container, label) as HTMLElement;

  if (!labelEl) {
    throw new Error(`Cannot find Material UI select by label "${label}".`);
  }

  return labelEl.parentElement as HTMLElement;
}
