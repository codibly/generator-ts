import * as React from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState } from 'App/store/AppState';

import {  } from './<%= name %>.style';

export namespace <%= name %> {
  export type StateProps = {};
  export type DispatchProps = {};
  export type Props = {};
  export type ConnectedProps = Props & StateProps & DispatchProps;
}

class <%= name %>Dumb extends React.Component<<%= name %>.ConnectedProps> {

  render() {
    return ( )
  }
}

const mapStateToProps = (state: AppState): <%= name %>.StateProps => ({ });

const mapDispatchToProps = (dispatch: Dispatch): <%= name %>.DispatchProps => ({ });

export const <%= name %> = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(<%= name %>Dumb);
