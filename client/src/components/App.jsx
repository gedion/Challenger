import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import Link from 'react-toolbox/lib/link';
import CodeDrawer from './CodeDrawer';
import CodeCard from './CodeCard';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ProgressBar from 'react-toolbox/lib/progress_bar';

import { toggleCodeDrawer, setDrawerListItem }
  from '../actions';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.handleCodeDrawerToggle = this.handleCodeDrawerToggle.bind(this);
    this.handeCodeDrawerListItemClick= this.handeCodeDrawerListItemClick.bind(this);
  }

  handleCodeDrawerToggle () {
    this.props.toggleCodeDrawer();
  }

  handeCodeDrawerListItemClick (event) {
    this.props.setDrawerListItem(_.get(event, 'target.innerText'));
  }

  appBarTest () {
    return (<AppBar onLeftIconClick={this.handleCodeDrawerToggle} title={''} leftIcon='menu' >
      <Navigation type='horizontal'>
        <Link href='#' icon='Curriculum Vitae' />
        <Link target="_blank" href='https://www.github.com/gedion' active icon='GitHub' />
      </Navigation>
    </AppBar>);
  }

  render () {
    let { runResults } = this.props;
    return (
      <div>
        {this.appBarTest()}
        {this.props.showProgressBar &&
          <ProgressBar mode="indeterminate" /> }
        <CodeDrawer show={this.props.showCodeDrawer}
          handleToggle={this.handleCodeDrawerToggle}
          onListItemClick={this.handeCodeDrawerListItemClick}
          codeCategories={this.props.codeCategories}
          showProgressBar={this.props.showProgressBar}
        />
      <br />
      <Grid fluid>
        <Row>
          {_.map(this.props.selectedCodeCards, ((card, index) => {
            return (<Col key={index} >
              <CodeCard runResults={runResults}  {...card} />
            </Col>);
          }))}
        </Row>
      </Grid>
      </div>
    );
  }
}

App.propTypes = {
  title: PropTypes.string,
  showCodeDrawer: PropTypes.bool,
  toggleCodeDrawer: PropTypes.func,
  codeCategories: PropTypes.array,
  selectedCodeCard: PropTypes.array,
  category: PropTypes.string,
  runResults: PropTypes.array,
  showProgressBar: PropTypes.bool
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleCodeDrawer: () => {
      toggleCodeDrawer(dispatch);
    },
    setDrawerListItem: (item) => {
      setDrawerListItem(dispatch, item);
    },
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
