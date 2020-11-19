import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
} from '@material-ui/core';
import API from '../utils/api';
import { StoreContext } from '../utils/store';
import { getToken } from '../utils/helpers';
import Answer from './Answer';

const api = new API('http://localhost:5005');

const QuestionAnswers = ({ questionAnswers }) => {
  const context = React.useContext(StoreContext);
  // const { answers: [answers] } = context;
  const { player: [player] } = context;
  const [answers, setAnswers] = React.useState([]);
  React.useEffect(() => {
    if (answers.length > 1) {
      console.log(answers);
      (async () => {
        const res = await api.put(`play/${player}/answer`, {
          headers: { 'Content-type': 'application/json', Authorization: getToken() },
          body: JSON.stringify({
            answerIds: answers,
          }),
        });
        console.log(res);
      })();
    }
  }, [answers, player]);

  return (
    <Grid container spacing={2} direction="row">
      {questionAnswers.map((a) => (
        <Answer
          id={a.id}
          text={a.answer}
          key={`answer-${a.id}`}
          answers={answers}
          setAnswers={setAnswers}
        />
      ))}
    </Grid>
  );
};

QuestionAnswers.propTypes = {
  questionAnswers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default QuestionAnswers;