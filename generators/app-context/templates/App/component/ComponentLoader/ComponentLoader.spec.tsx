import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ComponentLoader } from './ComponentLoader';

describe('<ComponentLoader />', () => {
  it('should render nothing before delay pass', () => {
    const { container } = render(
      <ComponentLoader
        pastDelay={false}
        isLoading={true}
        timedOut={false}
        error={false}
        retry={jest.fn()}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render loader after delay pass', () => {
    const { container } = render(
      <ComponentLoader
        pastDelay={true}
        isLoading={true}
        timedOut={false}
        error={false}
        retry={jest.fn()}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render taking too long after timeout pass', () => {
    const { container, getByText } = render(
      <ComponentLoader
        pastDelay={true}
        isLoading={true}
        timedOut={true}
        error={false}
        retry={jest.fn()}
      />
    );

    expect(getByText('Taking a long time...')).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render error page and retry button on error', () => {
    const retry = jest.fn();
    const { container, getByText } = render(
      <ComponentLoader
        pastDelay={false}
        isLoading={false}
        timedOut={false}
        error={true}
        retry={retry}
      />
    );

    expect(
      getByText(
        /An error occurred during the application loading and this view could not be displayed/
      )
    ).toBeDefined();
    fireEvent.click(getByText('reload this view'));

    expect(retry).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
  });
});
