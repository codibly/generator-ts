import * as React from "react";
import { render } from "@testing-library/react";
import { <%= name %>Router } from "./<%= name %>Router";

describe('<<%= name %>Router />', () => {

  beforeEach(() => {
    const renderer = render(<<%= name %>Router />);
  });

});
