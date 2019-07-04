import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import { SwitchField } from './SwitchField';

// tslint:disable:no-duplicate-string
describe('SwitchField', () => {
  it('should render switch field for enabled state', () => {
    const rendered = render(
      <SwitchField
        checked={true}
        label="Default label"
        enabledLabel="Enabled label"
        disabledLabel="Disabled label"
      />
    );

    expect(rendered.getByText('Enabled label')).toBeTruthy();
    expect(rendered.queryByText('Disabled label')).toBeFalsy();
    expect(rendered.queryByText('Default label')).toBeFalsy();
  });

  it('should render switch field for disabled state', () => {
    const rendered = render(
      <SwitchField
        checked={false}
        label="Default label"
        enabledLabel="Enabled label"
        disabledLabel="Disabled label"
      />
    );

    expect(rendered.getByText('Disabled label')).toBeTruthy();
    expect(rendered.queryByText('Enabled label')).toBeFalsy();
    expect(rendered.queryByText('Default label')).toBeFalsy();
  });

  it('should render switch field with default label for enabled state', () => {
    const rendered = render(
      <SwitchField checked={true} label="Default label" disabledLabel="Disabled label" />
    );

    expect(rendered.getByText('Default label')).toBeTruthy();
    expect(rendered.queryByText('Disabled label')).toBeFalsy();
  });

  it('should render switch field with default label for disabled state', () => {
    const rendered = render(
      <SwitchField checked={false} label="Default label" enabledLabel="Enabled label" />
    );

    expect(rendered.getByText('Default label')).toBeTruthy();
    expect(rendered.queryByText('Enabled label')).toBeFalsy();
  });
});
