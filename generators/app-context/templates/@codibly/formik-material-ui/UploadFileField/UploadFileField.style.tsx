import styled from '@emotion/styled';
import * as React from 'react';
import { WithTheme } from '../../../App/theme';

export const UploadFieldWrapper = styled.div({
  width: '100%',
  height: '100%'
});

export namespace DropzoneWrapper {
  export type Props = {
    isDragActive: boolean;
    isDragReject: boolean;
    isFocused: boolean;
    isDisabled: boolean;
  };
}

function getDropzoneBackground({
  theme,
  isDragActive,
  isDragReject,
  isDisabled
}: DropzoneWrapper.Props & WithTheme) {
  switch (true) {
    case isDisabled:
      return theme!.palette.grey['100'];

    case isDragReject:
      return theme!.branding.negative.light;

    case isDragActive:
      return theme!.branding.positive.light;

    default:
      return theme!.palette.grey['50'];
  }
}

function getDropzoneColor({
  theme,
  isDragActive,
  isDragReject
}: DropzoneWrapper.Props & WithTheme) {
  switch (true) {
    case isDragReject:
      return theme!.branding.negative.dark;

    case isDragActive:
      return theme!.branding.positive.dark;

    default:
      return theme!.palette.text.primary;
  }
}

const DropzoneWrapperDiv = React.forwardRef<HTMLDivElement, DropzoneWrapper.Props & WithTheme>(
  ({ isDragActive, isDragReject, isFocused, isDisabled, ...props }, ref) => (
    <div ref={ref} {...props} />
  )
);
export const DropzoneWrapper = styled(DropzoneWrapperDiv)(
  (props: DropzoneWrapper.Props & WithTheme) => ({
    ...props.theme!.typography.body2,
    border: `2px dashed ${props.theme!.palette.divider}`,
    background: getDropzoneBackground(props),
    color: getDropzoneColor(props),
    padding: '2em',
    width: '100%',
    height: '100%',
    minHeight: 140,
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: props.theme!.shape.borderRadius,
    cursor: props.isDisabled ? 'default' : 'pointer',
    pointerEvents: props.isDisabled ? 'none' : 'auto',
    filter: props.isDisabled ? 'grayscale(1)' : 'none',
    userSelect: 'none',
    outline: 'none'
  })
);
