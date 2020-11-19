import {
  Typography, LinearProgress, Container, Paper, CardMedia,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown';
import React from 'react';

const QuestionPreview = ({ question, setStage }) => {
  const renderer = ({ seconds }) => <LinearProgress variant="determinate" value={seconds * 20} />;

  const handleComplete = () => {
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
};

export default QuestionPreview;
