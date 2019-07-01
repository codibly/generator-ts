import { connect } from 'formik';
import * as React from 'react';
import { ComponentType } from 'react';
import { FormStatus } from '../FormStatus/FormStatus';

export namespace FormError {
  export type Props = {
    component: ComponentType<WrappedErrorProps>;
  };
  export type WrappedErrorProps<T = any> = {
    error: T;
  };
}

const FormErrorComponentFactory = (
  component: ComponentType<FormError.WrappedErrorProps>
): ComponentType<FormStatus.WrappedStatusProps> => (props) =>
  props.status && props.status.error
    ? React.createElement(component, { error: props.status.error })
    : null;

export const FormError: ComponentType<FormError.Props> = connect((props) => (
  <FormStatus component={FormErrorComponentFactory(props.component)} />
));
