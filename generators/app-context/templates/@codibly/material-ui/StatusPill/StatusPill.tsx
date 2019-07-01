import styled from '@emotion/styled';
import { Theme as MuiTheme } from '@material-ui/core';
import * as React from 'react';
import { ComponentType, CSSProperties } from 'react';
import { Pill } from '../Pill/Pill';

export namespace StatusPill {
  export type Variant = 'negative' | 'neutral' | 'positive';
  export type Props = {
    variant: Variant;
  };
  type VariantTheme = CSSProperties;
  export type Theme = {
    codibly: {
      MuiStatusPill: {
        negative: VariantTheme;
        neutral: VariantTheme;
        positive: VariantTheme;
      };
    };
  };
  export type ThemeOptions = Theme;
  export type WithTheme = {
    theme?: MuiTheme & Theme;
  };
}

function getPillTheme(variant: StatusPill.Variant, theme?: MuiTheme & StatusPill.Theme) {
  if (theme && theme.codibly && theme.codibly.MuiStatusPill) {
    return theme.codibly.MuiStatusPill[variant] || {};
  }

  return {};
}

export const StatusPill = styled(({ variant, ...props }) => <Pill {...props} />)(
  ({ variant, theme }: StatusPill.Props & StatusPill.WithTheme & any) => ({
    ...getPillTheme(variant, theme)
  })
) as ComponentType<StatusPill.Props>;
