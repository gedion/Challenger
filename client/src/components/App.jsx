import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Navigation from 'react-toolbox/lib/navigation';
import Link from 'react-toolbox/lib/link';
import CodeDrawer from './CodeDrawer';
import CodeCard from './CodeCard';
//import { Grid, Row, Col } from 'react-flexbox-grid';
import ProgressBar from 'react-toolbox/lib/progress_bar';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';

import { toggleCodeDrawer, setDrawerListItem }
  from '../actions';

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
};

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
  appBar () {
    const { classes } = this.props;
    return (<div onClick={this.handleCodeDrawerToggle} className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            Programmer
          </Typography>
        </Toolbar>
      </AppBar>
    </div>);
  }

  render () {
    const { classes } = this.props;
    let { runResults } = this.props;
    return (
      <div>
        {this.appBar()}
        {this.props.showProgressBar &&
          <ProgressBar mode="indeterminate" /> }
        <CodeDrawer show={this.props.showCodeDrawer}
          handleToggle={this.handleCodeDrawerToggle}
          onListItemClick={this.handeCodeDrawerListItemClick}
          codeCategories={this.props.codeCategories}
          showProgressBar={this.props.showProgressBar}
        />
      <br />
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center" spacing={Number(16)}>
            {_.map(this.props.selectedCodeCards, ((card, index) => {
              return (<Grid key={index} item>
                <CodeCard runResults={runResults}  {...card} />
              </Grid>)
            }))}
          </Grid>
        </Grid>
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
  showProgressBar: PropTypes.bool,
  classes: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(withStyles(styles)(App));
