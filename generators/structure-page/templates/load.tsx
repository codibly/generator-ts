import * as React from "react";
import { Loadable } from "App/component/Loadable/Loadable";
import { <%= name %>Page as <%= name %>PageType } from "./<%= name %>Page";

export const <%= name %>PageLoadable = Loadable<<%= name %>PageType.Props>({
  loader: () => import("./<%= name %>Page" /* webpackChunkName: "<%= name %>Page" */),
  render: ({ <%= name %>Page }, props) => <<%= name %>Page {...props} />
});
