import { queryByText } from '@testing-library/react';

export function getMuiSwitchFieldByLabel(label: string, container = document.body): HTMLElement {
  const labelEl = queryByText(container, label) as HTMLElement;

  if (!labelEl) {
    throw new Error(`Cannot find Material UI switch field by label "${label}".`);
  }

  return labelEl.parentElement as HTMLElement;
}
