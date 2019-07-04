import styled from '@emotion/styled';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { ComponentType } from 'react';
import { WithTheme } from '../../theme';

export const ErrorContainer = styled.div(
  {
    margin: '1em 0',
    padding: '.6em 1em',
    width: 320,
    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 6px, rgba(0, 0, 0, 0.08) 0px 1px 4px'
  },
  ({ theme }: WithTheme) => ({
    borderRadius: theme!.shape.borderRadius,
    [theme!.breakpoints.down('sm')]: {
      maxWidth: 240
    },
    backgroundColor: theme!.branding.negative.medium,
    color: theme!.palette.common.white
  })
);

export const ErrorText = styled(Typography)(({ theme }: TypographyProps & WithTheme) => ({
  color: theme!.palette.common.white
})) as ComponentType<TypographyProps>;
