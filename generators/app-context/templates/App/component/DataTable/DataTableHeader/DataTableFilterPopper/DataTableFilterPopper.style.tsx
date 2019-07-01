import styled from '@emotion/styled';
import { Paper } from '@material-ui/core';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import { PaperProps } from '@material-ui/core/Paper';
import { ComponentType } from 'react';
import * as React from 'react';
import { WithTheme } from '../../../../theme';

export const FilterContainer = styled.div({
  position: 'absolute',
  right: 6,
  top: 6
});

export namespace FilterButton {
  export type Props = IconButtonProps & {
    open: boolean;
    active: boolean;
  };
}

export const FilterButton = styled(({ open, active, ...props }) => <IconButton {...props} />)(
  ({ open, active, theme }: FilterButton.Props & WithTheme & any) => ({
    color: 'inherit',
    opacity: active ? 1 : open ? 0.7 : 0.4,
    transition: theme!.transitions.create('opacity'),
    '&:hover': {
      opacity: active ? 1 : 0.7
    }
  })
) as ComponentType<FilterButton.Props>;

export const FilterPaper = styled(Paper)({
  padding: '.5em 1.5em'
}) as ComponentType<PaperProps>;
