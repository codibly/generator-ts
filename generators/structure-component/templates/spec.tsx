import * as React from "react";
import { render } from "@testing-library/react";
import { <%= name %> } from "./<%= name %>";

describe('<<%= name %> />', () => {

  it('should render <<%= name %> />', () => {
    const { container } = render(<<%= name %> />);
    expect(container).toMatchSnapshot();
  });

});
