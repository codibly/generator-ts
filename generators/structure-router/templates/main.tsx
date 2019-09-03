import * as React from "react";
import { FC } from "react";
import { Route, Switch } from "react-router";
import { <%= name %>RouterData } from "./<%= name %>Router.data";

export namespace <%= name %>Router {
  export type Props = { };
}

export const <%= name %>Router: FC<<%= name %>Router.Props> = (props) => (
  <>
    <Switch>
      {<%= name %>RouterData.ROUTE_ITEMS.map(route => (
        <Route {...route} key={route.path} />
      ))}
    </Switch>
  </>
);
