import React from 'react';
import {
  Grid, Card, CardActionArea, Typography, makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { StoreContext } from '../utils/store';

const useStyles = makeStyles(() => ({
  selectedAnswer: {
    backgroundColor: 'rgb(186,225,255)',
    height: '20vh',
    color: 'black',
  },
  nonSelectedAnswer: {
    backgroundColor: 'rgb(61,61,61)',
    height: '20vh',
  },
  correctAnswer: {
    backgroundColor: 'rgb(37, 208, 32)',
    height: '20vh',
  },
  incorrectAnswer: {
    backgroundColor: 'rgb(239,81,133)',
    height: '20vh',
  },
}));

const Answer = ({
  id, text, className,
}) => {
  const context = React.useContext(StoreContext);
  const { currQuestion: [currQuestion] } = context;
  const { playerAnswers: [playerAnswers, setPlayerAnswers] } = context;
  const [selected, setSelected] = React.useState(false);
  const classes = useStyles();

  const handleMultipleAnswer = () => {
    // if the answer was previously selected then remove it from player Answers
    let updatedAnswers;
    if (selected) {
      updatedAnswers = playerAnswers.filter((a) => a.id !== id);
    } else {
      updatedAnswers = [...playerAnswers, id];
    }
    setPlayerAnswers(updatedAnswers);
    setSelected(!selected);
  };

  const handleSingleAnswer = () => {
    let updatedAnswers;
    // if its not selected, then we can highlight
    if (!playerAnswers) {
      updatedAnswers = [id];
    } else if (playerAnswers[0] === id) {
      updatedAnswers = [];
    }
    setPlayerAnswers(updatedAnswers);
  };

  // React.useEffect(() => {
  //   if (currQuestion.qType === 'single' && playerAnswers) {
  //     if (playerAnswers[0] !== id) {
  //       setSelected(false);
  //       console.log('wowow');
  //     }
  //   }
  // }, [currQuestion.qType, id, playerAnswers]);

  // React.useEffect(() => {
  //   // if answers change and the type is single, we just need to set selected
  //   const isAnswer = () => playerAnswers.find((a) => a.id === id);
  //   console.log(isAnswer());
  //   if (currQuestion.qType === 'single' && !isAnswer()) {
  //     console.log('inside useeffect setting selected');
  //     // setSelected(false);
  //   }
  // }, [playerAnswers, currQuestion.qType, id, selected]);

  const handleClass = () => {
    if (className === 'incorrectAnswer') {
      return classes.incorrectAnswer;
    } if (className === 'correctAnswer') {
      return classes.correctAnswer;
    } if (selected) {
      return classes.selectedAnswer;
    }
    return classes.nonSelectedAnswer;
  };
  return (
    <Grid item sm={6}>
      <CardActionArea onClick={currQuestion.qType === 'single' && !className.includes('correct')
        ? () => handleSingleAnswer()
        : () => handleMultipleAnswer()}
      >
        <Card className={handleClass()}>
          <Typography
            className={handleClass()}
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
  className: PropTypes.string.isRequired,
};

export default Answer;
