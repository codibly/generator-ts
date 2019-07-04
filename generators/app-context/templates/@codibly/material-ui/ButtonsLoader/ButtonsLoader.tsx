import * as React from 'react';
import { FunctionComponent } from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

export namespace ButtonsLoader {
  export type Props = IContentLoaderProps;
}

export const ButtonsLoader: FunctionComponent<ButtonsLoader.Props> = (props) => (
  <ContentLoader {...props} height={36} style={{ height: 36 }}>
    <rect x="0" y="0" rx="5" ry="5" width="60" height="36" />
    <rect x="70" y="0" rx="5" ry="5" width="110" height="36" />
    <rect x="190" y="0" rx="5" ry="5" width="90" height="36" />
  </ContentLoader>
);
