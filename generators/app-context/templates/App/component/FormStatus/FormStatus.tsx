import { connect } from 'formik';
import * as React from 'react';
import { ComponentType } from 'react';

export namespace FormStatus {
  export type Props = {
    component: ComponentType<WrappedStatusProps>;
  };

  export type WrappedStatusProps<T = any> = {
    status: T;
  };
}

export const FormStatus: ComponentType<FormStatus.Props> = connect((props) => {
  if (props.formik.status && props.component) {
    return React.createElement(props.component, { status: props.formik.status });
  }

  return null;
});
