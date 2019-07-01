import * as React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { muteErrors, unmuteErrors } from '../../../@codibly/mute-errors';
import { renderInApp } from '../../test/renderInApp';
import { tick } from '../../test/util/tick';
import { ConnectedDialogPure } from './ConnectedDialog';

describe('ConnectedDialog', () => {
  it('should render dialog content with params', () => {
    const { getByText } = render(
      <ConnectedDialogPure
        name="NAME"
        open={true}
        params={{ message: 'Hello!' }}
        onClose={jest.fn()}
        onReopen={jest.fn()}
      >
        {({ message }) => message}
      </ConnectedDialogPure>
    );

    expect(getByText('Hello!')).toBeDefined();
  });

  it('should render dialog content without params', () => {
    const { getByText } = render(
      <ConnectedDialogPure
        name="NAME"
        open={true}
        params={{ message: 'Hello!' }}
        onClose={jest.fn()}
        onReopen={jest.fn()}
      >
        Test without params
      </ConnectedDialogPure>
    );

    expect(getByText('Test without params')).toBeDefined();
  });

  it('should render closed dialog without throwing and error', () => {
    const rendered = render(
      <ConnectedDialogPure
        name="NAME"
        open={false}
        params={{}}
        onClose={jest.fn()}
        onReopen={jest.fn()}
      >
        {({ message: { test } }) => test}
      </ConnectedDialogPure>
    );

    expect(rendered).toBeTruthy();
  });

  it('should display fallback if there is an error', async () => {
    const ErrorComponent = () => {
      throw new Error();
    };

    const onReopen = jest.fn();
    const onClose = jest.fn();

    muteErrors();
    const { getByText } = renderInApp(
      <ConnectedDialogPure
        name="NAME"
        open={true}
        params={{}}
        onClose={onClose}
        onReopen={onReopen}
      >
        <ErrorComponent />
      </ConnectedDialogPure>
    );
    unmuteErrors();

    await tick();

    expect(getByText('Application error')).toBeDefined();

    fireEvent.click(getByText('reopen the modal'));
    expect(onReopen).toBeCalled();

    fireEvent.click(getByText('Close'));
    expect(onClose).toBeCalled();
  });
});
