import { FormHelperText } from '@material-ui/core';
import { FieldProps, getIn } from 'formik';
import * as React from 'react';
import { ReactNode, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { createFormikField } from '../../typed-formik';
import { DropzoneWrapper, UploadFieldWrapper } from './UploadFileField.style';
import { UploadFileMessage } from './UploadFileMessage/UploadFileMessage';

export type UploadFileFieldProps = FieldProps & {
  disabled?: boolean;
  accept?: string | string[];
  minSize?: number;
  maxSize?: number;
  multiple?: boolean;
  dragInactiveMessage?: ReactNode;
  dragActiveMessage?: ReactNode;
  className?: string;
};

export const UploadFileField = createFormikField(
  ({
    form,
    field,
    className,
    dragInactiveMessage,
    dragActiveMessage,
    ...options
  }: UploadFileFieldProps) => {
    const onDrop = useCallback(
      (anAcceptedFiles: File[]) => {
        form.setFieldTouched(field.name, true);
        form.setFieldValue(field.name, options.multiple ? anAcceptedFiles : anAcceptedFiles[0]);
      },
      [form.setFieldTouched, field.name, options.multiple]
    );

    const onClear = useCallback(() => {
      form.setFieldValue(field.name, options.multiple ? [] : undefined);
    }, [form.setFieldValue, field.name, options.multiple]);

    useEffect(onClear, [options.multiple]);

    const isDisabled = options.disabled || form.isSubmitting;
    const { getRootProps, getInputProps, isDragActive, isDragReject, isFocused } = useDropzone({
      ...options,
      disabled: isDisabled,
      onDrop
    });

    const files = options.multiple ? field.value : field.value ? [field.value] : [];
    const isTouched = getIn(form.touched, field.name) || form.submitCount > 0;
    const error = getIn(form.errors, field.name);

    return (
      <UploadFieldWrapper className={className}>
        <DropzoneWrapper
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
          isFocused={isFocused}
          isDisabled={isDisabled}
        >
          <input {...getInputProps()} name={field.name} />
          <UploadFileMessage
            files={files}
            onClear={onClear}
            isDragActive={isDragActive}
            dragActiveMessage={dragActiveMessage}
            dragInactiveMessage={dragInactiveMessage}
          />
        </DropzoneWrapper>
        {error && isTouched && <FormHelperText error>{error}</FormHelperText>}
      </UploadFieldWrapper>
    );
  },
  'UploadFileField'
);
