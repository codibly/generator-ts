import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { muteErrors, unmuteErrors } from '@codibly/mute-errors';
import { tick } from '@codibly/test-utils';
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
        renderErrorFallbackContent={ () => <div>reopen the modal</div>}
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
        renderErrorFallbackContent={ () => <div>reopen the modal</div>}
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
        renderErrorFallbackContent={ () => <div>reopen the modal</div>}
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
    const { container, getByText } = render(
      <ConnectedDialogPure
        name="NAME"
        open={true}
        params={{}}
        onClose={onClose}
        onReopen={onReopen}
        renderErrorFallbackContent={ (onReopen) => <div onClick={onReopen()}>reopen the modal</div>}
      >
        <ErrorComponent />
      </ConnectedDialogPure>
    );
    unmuteErrors();

    await tick();

    fireEvent.click(getByText('reopen the modal'));
    expect(onReopen).toBeCalled();

    fireEvent.click(getByText('Close'));
    expect(onClose).toBeCalled();
  });
});
