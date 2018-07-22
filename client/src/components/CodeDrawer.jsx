import Drawer from 'react-toolbox/lib/drawer';
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';
import ProgressBar from 'react-toolbox/lib/progress_bar';

class CodeDrawer extends React.Component {

  render () {
    return (
      <div>
        <Drawer active={this.props.show} onOverlayClick={this.props.handleToggle}>
        {this.props.showProgressBar &&
          <ProgressBar type="circular" mode="indeterminate" /> }
          <List selectable ripple>
            <ListSubHeader caption='Programming' />
              {_.map(this.props.codeCategories,((cat, index) => {
              return (<ListItem key={index}
                onClick={this.props.onListItemClick}
                avatar= { CodeDrawer.DRAWER_LIST_ITEM_AVATAR }
                legend={cat.legend}
                caption={cat.caption}
              />);
              }))}
           </List>
        </Drawer>
      </div>
    );
  }
}

CodeDrawer.DRAWER_LIST_ITEM_AVATAR = 'https://dl.dropboxusercontent.com/u/2247264/assets/m.jpg';

CodeDrawer.propTypes = {
  handleToggle: PropTypes.func,
  onListItemClick: PropTypes.func,
  show: PropTypes.bool,
  codeCategories: PropTypes.array,
  showProgressBar: PropTypes.bool
};

export default CodeDrawer;
