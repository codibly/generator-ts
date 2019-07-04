import styled from '@emotion/styled';
import {Table, Theme} from '@material-ui/core';
import { ComponentType } from 'react';
import * as React from 'react';

export namespace LoadableTable {
  export type Props = {
    loading?: boolean;
  };
}
export const LoadableTable = styled(({ loading, ...props }) => <Table {...props} />)(
  ({ loading, theme }: LoadableTable.Props & { theme: Theme }) => ({
    transition: theme!.transitions.create('opacity'),
    ...(loading
      ? {
          opacity: 0.5,
          pointerEvents: 'none',
          userSelection: 'none',
          cursor: 'progress'
        }
      : {})
  })
) as ComponentType<LoadableTable.Props>;
