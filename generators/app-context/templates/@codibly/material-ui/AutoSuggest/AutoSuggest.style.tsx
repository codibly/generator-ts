import createStyles from '@material-ui/core/styles/createStyles';

export const styles = createStyles({
  suggestionsContainerOpen: {
    zIndex: 10000,
    maxHeight: 200,
    overflowY: 'auto'
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  }
});
