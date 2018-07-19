import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { }
  from '../actions';

class App extends React.Component {
  render () {
    return (
      <h3> {this.props.title} </h3>
    );
  }
}

App.propTypes = {
  title: PropTypes.string
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  };
};

const mapStateToProps = state => {
  return state;
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps
  };
};

App.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);
