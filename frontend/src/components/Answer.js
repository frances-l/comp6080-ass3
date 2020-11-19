import React from 'react';
import {
  Grid, Card, CardActionArea, Typography, makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  selectedAnswer: {
    backgroundColor: 'rgb(186,225,255)',
    height: '10vh',
  },
  nonSelectedAnswer: {
    backgroundColor: 'white',
  },
}));

const Answer = ({
  id, text, answers, setAnswers,
}) => {
  const [selected, setSelected] = React.useState(false);
  const classes = useStyles();
  const handleSelect = async () => {
    let updatedAnswers;
    // if it was previously selected, we need to remove it out of the array
    if (selected) {
      updatedAnswers = answers.filter((a) => a !== id);
    } else {
      updatedAnswers = [...answers, id];
    }
    console.log(updatedAnswers);
    setAnswers(updatedAnswers);
    setSelected(!selected);
  };

  return (
    <Grid item sm={6}>
      <Card className={selected ? classes.selectedAnswer : classes.nonSelectedAnswer}>
        <CardActionArea onClick={() => handleSelect()}>
          <Typography>{text}</Typography>
        </CardActionArea>
      </Card>

    </Grid>
  );
};
Answer.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.number).isRequired,
  setAnswers: PropTypes.func.isRequired,
};

export default Answer;
