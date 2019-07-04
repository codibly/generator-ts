import { Field, FieldConfig, FieldProps } from 'formik';
import { ComponentType, FunctionComponent } from 'react';
import * as React from 'react';
import { Omit } from 'utility-types';

type TypedFieldProps<TProps extends FieldProps> = FieldConfig & Omit<TProps, 'field' | 'form'>;

export function createFormikField<TProps extends FieldProps>(
  component: ComponentType<TProps>,
  name?: string
): ComponentType<TypedFieldProps<TProps>> {
  const TypedField: FunctionComponent<TypedFieldProps<TProps>> = (props) => (
    <Field component={component} {...props} />
  );

  TypedField.displayName = `TypedField(${name ||
    component.displayName ||
    component.constructor.name})`;

  return TypedField;
}
