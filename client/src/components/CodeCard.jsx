import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';

class CodeCard extends React.Component {
  render () {
    return (
      <Card raised style={{width: '275px'}}>
        <CardTitle
          avatar="https://placeimg.com/80/80/animals"
          title={this.props.title}
          subtitle={this.props.category}
        />
        <CardMedia
          aspectRatio="wide"
          image="https://placeimg.com/800/450/nature"
        />
        <CardTitle
          title="Title goes here"
          subtitle="Subtitle here"
        />
        <CardText>{CodeCard.DUMMY_TEXT}</CardText>
        <CardActions >
          <Button label="Action 1" />
        </CardActions>
      </Card>);
    }
}

CodeCard.DUMMY_TEXT= 'Lorem Ipsum is simply dummy text of the printing and typesetting industry';

CodeCard.propTypes = {
  handleToggle: PropTypes.func,
  show: PropTypes.bool,
  category: PropTypes.string
};

export default CodeCard;
