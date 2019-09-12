import * as React from "react";
import { render } from "@testing-library/react";
import { <%= name %>Page } from "./<%= name %>Page";

describe('<<%= name %>Page />', () => {
  
  it('should render <<%= name %>Page />', () => {
    const { container } = render(<<%= name %>Page />);
    expect(container).toMatchSnapshot();
  });
  
});
