import * as React from 'react';
import { FC } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { AppDispatch } from 'App/store/AppDispatch';
import { AppState } from 'App/store/AppState';

import {  } from './<%= name %>.style';

export namespace <%= name %> {
  export type StateProps = {};
  export type DispatchProps = {};
  export type Props = {};
  
  export type ConnectedProps = Props & StateProps & DispatchProps;
}

export const <%= name %>Dumb: FC<<%= name %>.ConnectedProps> = (props) => {
  return null;
};

const mapStateToProps = (state: AppState): <%= name %>.StateProps => ({ });

const mapDispatchToProps = (dispatch: AppDispatch): <%= name %>.DispatchProps => ({ });

export const <%= name %> = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(<%= name %>Dumb);
