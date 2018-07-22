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

import { toggleCodeDrawer, setDrawerListItem}
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
    return (<AppBar title={this.props.title} leftIcon='menu' >
      <Navigation type='horizontal'>
        <Link href='http://' label='Inbox' icon='inbox' />
        <Link href='http://' active label='Profile' icon='person' />
      </Navigation>
    </AppBar>);
  }

  render () {
    return (
      <div>
        {this.appBarTest()}
        <CodeDrawer show={this.props.showCodeDrawer}
          handleToggle={this.handleCodeDrawerToggle}
          onListItemClick={this.handeCodeDrawerListItemClick}
          codeCategories={this.props.codeCategories}
        />
      <Grid fluid>
        <Row>
          {_.map(this.props.selectedCodeCards, ((card, index) => {
            return (<Col xs={6} md={3} key={index} >
              <CodeCard {...card} />
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
  category: PropTypes.string
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
