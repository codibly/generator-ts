import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { AsyncButton } from './AsyncButton';

describe('AsyncButton', () => {
  it('should render in default state', () => {
    const onClick = jest.fn();

    const { container, getByText } = render(
      <AsyncButton onClick={onClick}>Test button</AsyncButton>
    );

    const button = getByText('Test button');
    expect(button).toBeDefined();
    expect(onClick).not.toBeCalled();

    fireEvent.click(button);
    expect(onClick).toBeCalled();

    expect(container.firstChild).toMatchSnapshot();
  });

  it.each([[false, false, true], [false, true, false], [true, false, false], [true, true, false]])(
    'should render in pending: %p, disabled: %p state',
    (pending, disabled, clickable) => {
      const onClick = jest.fn();

      const { container, getByText } = render(
        <AsyncButton pending={pending} disabled={disabled} onClick={onClick}>
          Test button
        </AsyncButton>
      );

      const button = getByText('Test button');
      expect(button).toBeDefined();
      expect(onClick).not.toBeCalled();

      fireEvent.click(button);
      if (clickable) {
        expect(onClick).toBeCalled();
      } else {
        expect(onClick).not.toBeCalled();
      }

      expect(container.firstChild).toMatchSnapshot();
    }
  );
});
