import Button, { ButtonProps } from '@material-ui/core/Button';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { ButtonProgress } from './AsyncButton.style';

export namespace AsyncButton {
  export type Props = ButtonProps & {
    pending?: boolean;
  };
}

export const AsyncButton: FunctionComponent<AsyncButton.Props> = ({
  disabled,
  pending,
  children,
  ...props
}) => (
  <Button disabled={disabled || pending} {...props}>
    {pending && <ButtonProgress size={24} />}
    {children}
  </Button>
);
