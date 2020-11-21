import React from 'react';
import {
  Grid, Card, CardActionArea, Typography, makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { StoreContext } from '../utils/store';

const useStyles = makeStyles(() => ({
  selectedAnswer: {
    backgroundColor: 'rgb(186,225,255)',
    height: '10vh',
    color: 'black',
  },
  nonSelectedAnswer: {
    backgroundColor: 'rgb(61,61,61)',
    height: '10vh',
  },
}));

const Answer = ({
  id, text, answers, setAnswers,
}) => {
  const context = React.useContext(StoreContext);
  const { currQuestion: [currQuestion] } = context;

  const [selected, setSelected] = React.useState(false);
  const classes = useStyles();

  const handleSelect = async () => {
    let updatedAnswers;
    // if it was previously selected, we need to remove it out of the array
    if (!selected && currQuestion.qType === 'single') {
      updatedAnswers = [id];
      console.log(`setting updated answers to ${updatedAnswers}`);
    } else if (!selected && currQuestion.qType === 'multi') {
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
    if (currQuestion.qType === 'single' && !isAnswer()) {
      console.log('inside useeffect setting selected');
      // setSelected(false);
    }
  }, [answers, currQuestion.qType, id, selected]);

  return (
    <Grid item sm={6}>
      <CardActionArea onClick={() => handleSelect()}>
        <Card className={selected ? classes.selectedAnswer : classes.nonSelectedAnswer}>
          <Typography
            className={selected ? classes.selectedAnswer : classes.nonSelectedAnswer}
          >
            {text}

          </Typography>
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
};

export default Answer;
