import React from 'react';
import {
  Grid, InputBase, makeStyles,
  Checkbox, FormControlLabel, Paper,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { StoreContext } from '../utils/store';

const useStyles = makeStyles(() => ({
  answerContainer: {
    height: '10vh',
  },
}));

const EditAnswers = ({ aId, question, setQuestion }) => {
  // const [answer, setAnswer] = React.useState('');
  // const [correct, setCorrect] = React.useState(false);
  const context = React.useContext(StoreContext);
  const { edit: [edit] } = context;

  const handlePresets = () => edit.answers.find((a) => a.id === aId);

  const [checked, setChecked] = React.useState(handlePresets() ? handlePresets().correct : false);
  const handleAnswerTextChange = (text) => {
    const updatedQuestion = question;
    const foundAnswer = question.answers.filter((a) => a.id === aId);
    if (foundAnswer.length === 1) {
      const newAnswers = question.answers.map((a) => {
        if (a.id === aId) {
          return { id: aId, answer: text, correct: a.correct };
        }
        return a;
      });
      updatedQuestion.answers = newAnswers;
    } else {
      const newAns = { id: aId, answer: text, correct: false };
      updatedQuestion.answers.push(newAns);
    }

    setQuestion(updatedQuestion);
  };

  const handleAnswerCorrectChange = (isCorrect) => {
    setChecked(isCorrect);
    const updatedQuestion = question;
    const foundAnswer = question.answers.filter((a) => a.id === aId);
    if (foundAnswer.length === 1) {
      const newAnswers = question.answers.map((a) => {
        if (a.id === aId) {
          return { id: aId, answer: a.answer, correct: isCorrect };
        }
        return a;
      });
      updatedQuestion.answers = newAnswers;
      setQuestion(updatedQuestion);
    } else {
      const newAns = { id: aId, answer: '', correct: isCorrect };
      updatedQuestion.answers.push(newAns);
    }

    setQuestion(updatedQuestion);
  };
  const classes = useStyles();
  return (
    <Grid item xs={6}>
      <Paper className={classes.answerContainer}>
        <InputBase
          onChange={(event) => handleAnswerTextChange(event.target.value)}
          variant="filled"
          required
          defaultValue={handlePresets() ? handlePresets().answer : ''}
          placeholder={(() => {
            if (aId > 2) {
              return `Answer ${aId} (Optional)`;
            }
            return `Answer ${aId}`;
          })()}
        />
        <FormControlLabel
          onChange={(event) => handleAnswerCorrectChange(event.target.checked)}
          control={<Checkbox />}
          checked={checked}

        />
      </Paper>
    </Grid>
  );
};

EditAnswers.propTypes = {
  aId: PropTypes.number.isRequired,
  question: PropTypes.objectOf(PropTypes.any).isRequired,
  setQuestion: PropTypes.func.isRequired,
};

export default EditAnswers;
