import styled from '@emotion/styled';
import { WithTheme } from '@material-ui/core/styles/withTheme';
import { blockStyle, boldStyle } from '../ThemedEditor.style';

export const ThemedHtml = styled.div(({ theme }: Partial<WithTheme>) => ({
  ...theme!.typography.body1,
  h1: { ...theme!.typography.h1, ...blockStyle },
  h2: { ...theme!.typography.h2, ...blockStyle },
  h3: { ...theme!.typography.h3, ...blockStyle },
  h4: { ...theme!.typography.h4, ...blockStyle },
  h5: { ...theme!.typography.h5, ...blockStyle },
  h6: { ...theme!.typography.h6, ...blockStyle },
  p: { ...theme!.typography.body1, ...blockStyle },
  b: boldStyle
}));
