import styled from '@emotion/styled';

export const ToolbarContainer = styled.div({
  marginBottom: 20,
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  '> *': {
    marginRight: 15,
    '&:first-of-type': {
      marginLeft: 0
    },
    '&:last-child': {
      marginRight: 0
    }
  }
});
