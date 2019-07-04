import styled from '@emotion/styled';
import * as React from 'react';
import { HTMLAttributes } from 'react';

export namespace EmptyTableCellPlaceholder {
  export type Props = HTMLAttributes<HTMLTableCellElement> & {
    perPage: number;
  };
}

const DEFAULT_ROW_HEIGHT = 64;
export const EmptyTableCellPlaceholder = styled(({ perPage, ...props }) => <td {...props} />)(
  ({ perPage }: EmptyTableCellPlaceholder.Props & any) => ({
    height: perPage * DEFAULT_ROW_HEIGHT
  })
);

export const EmptyTableMessageContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1em'
});

export const EmptyTableMessage = styled.div({});
