import Drawer from 'react-toolbox/lib/drawer';
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Button } from 'react-toolbox/lib/button';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';

class CodeDrawer extends React.Component {

  render () {
    return (
      <div>
        <Button label='Show Drawer' raised accent onClick={this.props.handleToggle} />
        <Drawer active={this.props.show} onOverlayClick={this.props.handleToggle}>
          <List selectable ripple>
            <ListSubHeader caption='Programming' />
              {_.map(this.props.codeCategories,((cat, index) => {
              return (<ListItem key={index}
                onClick={this.props.onListItemClick}
                avatar= { CodeDrawer.DRAWER_LIST_ITEM_AVATAR }
                legend={cat.legend}
                caption={cat.caption}
                rightIcon='star'
              />);
              }))}
            <ListSubHeader caption='Programming' />
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
  codeCategories: PropTypes.array
};
export default CodeDrawer;
