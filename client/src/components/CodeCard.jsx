import React from 'react';
import PropTypes from 'prop-types';
// import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
// import {Button} from 'react-toolbox/lib/button';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class CodeCard extends React.Component {
  render () {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;

    let { error, stderr, stdout } = this.props.runResults[0] || {};
    stdout = (stdout) ? stdout : "";
    let outPutResults = stdout.split("\n").filter((line, index) => {
      return index > 4;
    }).map((line, index) => {
        return line.includes("=====") ? line.replace(/=/g, "") : line;
    });
    return (
      <div>
        <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                {this.props.title}
              </Typography>
              <Typography variant="headline" component="h2">
                be{bull}nev{bull}o{bull}lent
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {this.props.category}
              </Typography>
                {outPutResults.map((outPutResult, index) => {
                  return (<Typography key={index} >{outPutResult}</Typography>)
                })}
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
      </div>);
    }
}

CodeCard.DUMMY_TEXT= 'Lorem Ipsum is simply dummy text of the printing and typesetting industry';

CodeCard.propTypes = {
  handleToggle: PropTypes.func,
  show: PropTypes.bool,
  category: PropTypes.string,
  runResults: PropTypes.array,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CodeCard);
