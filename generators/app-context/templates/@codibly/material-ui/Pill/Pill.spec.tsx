import * as React from 'react';
import { render } from '@testing-library/react';
import { renderInApp } from 'App/test/renderInApp';
import { Pill } from './Pill';

describe('Pill', () => {
  it('should render a pill', () => {
    const { getByText, container } = renderInApp(<Pill>Test</Pill>);

    expect(getByText('Test')).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  it('should render without theme', () => {
    const { getByText } = render(<Pill>Without theme</Pill>);
    expect(getByText('Without theme')).toBeDefined();
  });
});
