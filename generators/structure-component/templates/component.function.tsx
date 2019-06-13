import * as React from 'react';
import { compose } from 'redux';

import { Wrapper } from './<%= name %>.style';

type StatProps = {

}

type DispatchProps = {

}

type Props = StatProps & DispatchProps & {

}

class <%= name %>Pure extends React.Component<Props> {

  render() {
    return (
      <Wrapper>
      </Wrapper>
    )
  }
}

export const <%= name %> = compose(

)(<%= name %>Pure);
