import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';

class CodeCard extends React.Component {
  render () {
    let { error, stderr, stdout } = this.props.runResults[0] || {};
    stdout = (stdout) ? stdout : "";
    let outPutResults = stdout.split("\n").filter((line, index) => {
      return index > 4;
    }).map((line, index) => {
        return line.includes("=====") ? line.replace(/=/g, "") : line;
    });
    return (
      <Card raised style={{width: '400px'}}>
        <CardTitle
          avatar="https://placeimg.com/80/80/animals"
          title={this.props.title}
          subtitle={this.props.category}
        />
        {outPutResults.map((outPutResult, index) => {
          return (<CardText key={index} >{outPutResult}</CardText>)
        })}
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
  category: PropTypes.string,
  runResults: PropTypes.array
};

export default CodeCard;
