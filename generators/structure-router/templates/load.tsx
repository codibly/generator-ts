import * as React from "react";
import { Loadable } from "App/component/Loadable/Loadable";

const <%= name %>RouterLoadable = Loadable({
  loader: () =>
    import(
      "./<%= name %>Router" /* webpackChunkName: "<%= name %>Router" */
      ),
  render: ({ <%= name %>Router }, props) => (
    <<%= name %>Router {...props} />
  )
});

export { <%= name %>RouterLoadable };
