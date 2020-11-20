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
    height: '10vh',
  },
}));

const Answer = ({
  id, text, answers, setAnswers, type,
}) => {
  const [selected, setSelected] = React.useState(false);
  const classes = useStyles();

  const handleSelect = async () => {
    let updatedAnswers;
    // if it was previously selected, we need to remove it out of the array
    if (!selected && type === 'single') {
      updatedAnswers = [id];
      console.log(`setting updated answers to ${updatedAnswers}`);
    } else if (!selected && type === 'multi') {
      updatedAnswers = [...answers, id];
      console.log(`setting updated answers to ${updatedAnswers}`);
    } else {
      updatedAnswers = answers.filter((a) => a !== id);
      console.log(`setting updated answers to ${updatedAnswers}`);
    }
    console.log(updatedAnswers);
    setAnswers(updatedAnswers);
    console.log(`setting selected to ${!selected}`);
    setSelected(!selected);
  };

  React.useEffect(() => {
    // if answers change and the type is single, we just need to set selected
    const isAnswer = () => answers.find((a) => a.id === id);
    console.log(isAnswer());
    if (type === 'single' && !isAnswer()) {
      console.log('inside useeffect setting selected');
      // setSelected(false);
    }
  }, [answers, id, selected, type]);

  return (
    <Grid item sm={6}>
      <CardActionArea onClick={() => handleSelect()}>
        <Card className={selected ? classes.selectedAnswer : classes.nonSelectedAnswer}>
          <Typography>{text}</Typography>
        </Card>
      </CardActionArea>

    </Grid>
  );
};
Answer.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.number).isRequired,
  setAnswers: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default Answer;
