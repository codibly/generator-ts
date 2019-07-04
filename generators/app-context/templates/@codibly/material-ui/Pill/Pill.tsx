import styled from '@emotion/styled';
import { Theme as MuiTheme, WithTheme } from '@material-ui/core';
import * as React from 'react';
import { ComponentType, HTMLAttributes } from 'react';

export namespace Pill {
  export type Props = HTMLAttributes<HTMLSpanElement>;
}

function getTypography(theme?: MuiTheme) {
  if (theme && theme.typography) {
    return theme.typography.caption;
  }

  return {};
}

export const Pill = styled.span(({ theme }: Partial<WithTheme>) => ({
  ...getTypography(theme),
  display: 'inline-flex',
  outline: 'none',
  whiteSpace: 'nowrap',
  borderRadius: 16,
  height: 32,
  verticalAlign: 'middle',
  justifyContent: 'center',
  textDecoration: 'none',
  alignItems: 'center',
  boxSizing: 'border-box',
  padding: '0 12px'
})) as ComponentType<Pill.Props>;
