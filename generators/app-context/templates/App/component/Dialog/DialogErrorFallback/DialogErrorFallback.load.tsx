import { Loadable } from 'App/component/Loadable/Loadable';
import * as React from 'react';
import { DialogErrorFallback as DialogErrorFallbackType } from './DialogErrorFallback';

export const DialogErrorFallbackLoadable = Loadable<DialogErrorFallbackType.Props>({
  loader: () => import('./DialogErrorFallback' /* webpackChunkName: "DialogErrorFallback" */),
  render: ({ DialogErrorFallback }, props) => <DialogErrorFallback {...props} />
});
