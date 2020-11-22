import {
  Typography, LinearProgress, Container, Paper, CardMedia,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown';
import React from 'react';
import { StoreContext } from '../utils/store';
// import API from '../utils/api';
// import { getToken } from '../utils/helpers' {currQuestion: [currQuestion]} = context;
// const api = new API('http://localhost:5005');
const QuestionPreview = ({ setStage }) => {
  const context = React.useContext(StoreContext);
  // const { session: [, setSession] } = context;
  const { currQuestion: [currQuestion] } = context;

  const renderer = ({ seconds }) => <LinearProgress variant="determinate" value={seconds} />;

  const handleComplete = async () => {
    setStage('question');
  };

  return (
    <section>
      <Container>
        <Paper>
          <Typography color="textPrimary" variant="h1">{currQuestion.question}</Typography>
        </Paper>
        {(() => {
          if (currQuestion.media.type === 'video') {
            return <CardMedia component="iframe" title="question-preview-video" src={currQuestion.media.src} />;
          } if (currQuestion.media.src) {
            return <img src={currQuestion.media.src} alt="question-preview" />;
          }
          return null;
        })()}
        <Countdown
          autoStart
          date={Date.now() + (currQuestion.preview * 1000)}
          renderer={renderer}
          onComplete={() => handleComplete()}
        />
      </Container>
    </section>
  );
};

QuestionPreview.propTypes = {
  setStage: PropTypes.func.isRequired,
};

export default QuestionPreview;
