import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { LoadingComponentProps } from 'react-loadable';
import { Centered } from '../Centered/Centered';
import { ErrorFallback } from '../ErrorFallback/ErrorFallback';
import { ErrorFallbackAction } from '../ErrorFallback/ErrorFallbackAction/ErrorFallbackAction';
import { ErrorFallbackContent } from '../ErrorFallback/ErrorFallbackContent/ErrorFallbackContent';
import { ErrorFallbackTitle } from '../ErrorFallback/ErrorFallbackTitle/ErrorFallbackTitle';
import { LoaderMessage } from './ComponentLoader.style';

export namespace ComponentLoader {
  export type Props = LoadingComponentProps;
}

export const ComponentLoader: FunctionComponent<ComponentLoader.Props> = ({
  timedOut,
  pastDelay,
  error,
  retry
}) => {
  if (error) {
    return (
      <ErrorFallback>
        <ErrorFallbackTitle>Loading error</ErrorFallbackTitle>
        <ErrorFallbackContent>
          An error occurred during the application loading and this view could not be displayed.
          Please, try to <ErrorFallbackAction onClick={retry}>reload this view</ErrorFallbackAction>
        </ErrorFallbackContent>
      </ErrorFallback>
    );
  } else if (timedOut) {
    return (
      <Centered>
        <CircularProgress color="secondary" />
        <LoaderMessage variant="body1">Taking a long time...</LoaderMessage>
      </Centered>
    );
  } else if (pastDelay) {
    return (
      <Centered>
        <CircularProgress />
      </Centered>
    );
  } else {
    return null;
  }
};
