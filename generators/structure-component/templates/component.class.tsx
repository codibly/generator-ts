import * as React from 'react';
import { compose } from 'redux';

import { Wrapper } from './<%= name %>.style';

export namespace <%= name %> {
  export type StatProps = {};

  export type DispatchProps = {};

  type OwnProps = {};

  export type Props = OwnProps & StatProps & DispatchProps;
}

class <%= name %>Pure extends React.Component<<%= name %>.Props> {

  render() {
    return (
      <Wrapper>
      </Wrapper>
    )
  }
}

export const <%= name %> = compose(

)(<%= name %>Pure);
