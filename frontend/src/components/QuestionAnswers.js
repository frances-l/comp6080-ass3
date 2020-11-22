import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
} from '@material-ui/core';
import API from '../utils/api';
import { StoreContext } from '../utils/store';
import { getToken } from '../utils/helpers';
import Answer from './Answer';
import ErrorHandler from './ErrorHandler';

const api = new API('http://localhost:5005');

const QuestionAnswers = ({ questionAnswers }) => {
  const context = React.useContext(StoreContext);
  const { apiError: [, setApiError] } = context;
  const { player: [player] } = context;
  const { playerAnswers: [playerAnswers] } = context;

  React.useEffect(() => {
    (async () => {
      await api.put(`play/${player.id}/answer`, {
        headers: { 'Content-type': 'application/json', Authorization: getToken() },
        body: JSON.stringify({
          answerIds: playerAnswers,
        }),
      });
    })();
  }, [playerAnswers, player, setApiError]);

  return (
    <Grid container spacing={2} direction="row">
      {questionAnswers.map((a) => (
        <Answer
          id={a.id}
          text={a.answer}
          key={`answer-${a.id}`}
          className="questionAnswer"
        />
      ))}
      <ErrorHandler />
    </Grid>
  );
};

QuestionAnswers.propTypes = {
  questionAnswers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default QuestionAnswers;
