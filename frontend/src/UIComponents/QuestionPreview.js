import {
  Typography, LinearProgress, Container, Paper, CardMedia,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown';
import React from 'react';
import { StoreContext } from '../utils/store';
import API from '../utils/api';
import { getToken } from '../utils/helpers';

const api = new API('http://localhost:5005');
const QuestionPreview = ({ question, setStage, quizId }) => {
  const context = React.useContext(StoreContext);
  const { session: [session] } = context;
  const renderer = ({ seconds }) => <LinearProgress variant="determinate" value={seconds * 20} />;

  const handleComplete = async () => {
    if (session.results.position === -1) {
      await api.post(`admin/quiz/${quizId}/advance`, { headers: { Authorization: getToken() } });
    }
    await api.post(`admin/quiz/${quizId}/advance`, { headers: { Authorization: getToken() } });
    setStage('question');
  };

  return (
    <section>
      <Container>
        <Paper>
          <Typography variant="h1">{question.question}</Typography>
        </Paper>
        { question.media && <CardMedia component="iframe" title="question-media" src={question.media} />}
        <Countdown
          date={Date.now() + 5000}
          renderer={renderer}
          onComplete={() => handleComplete()}
        />
      </Container>
    </section>
  );
};

QuestionPreview.propTypes = {
  question: PropTypes.objectOf(PropTypes.any).isRequired,
  setStage: PropTypes.func.isRequired,
  quizId: PropTypes.number.isRequired,
};

export default QuestionPreview;
