import React from 'react';
import {
  Typography, Container, Grid, CardMedia,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
import QuestionAnswers from '../components/QuestionAnswers';
// this will interchange with the PlayPage, itll alternate between this and question results
const QuestionPage = ({ setStage, question }) => {
  // so it doesnt scream at me
  console.log(question);

  const handleDurationExpire = () => {
    console.log('setting result');
    setStage('results');
  };

  return (
    <article>
      {/* Change this navBar to pause game, quit, etc */}
      <Container>
        <Typography variant="h1" align="center">{question.question}</Typography>
        {(() => {
          if (question.media !== '') {
            return (
              <Grid container item>
                <CardMedia component="iframe" title="question-media" src={question.media} />
              </Grid>
            );
          }
          return (null);
        })()}
      </Container>
      <Timer duration={question.time} onComplete={handleDurationExpire} />
      <QuestionAnswers questionAnswers={question.answers} />
    </article>
  );
};

QuestionPage.propTypes = {
  setStage: PropTypes.func.isRequired,
  question: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default QuestionPage;

// this will help with timer
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';
/*
  return (
    <div>
      <CountdownCircleTimer
        isPlaying
        duration={5}
        colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
        onComplete={() => handleTimerExpire()}
      >
        {renderer}
      </CountdownCircleTimer>
    </div>
  );
*/
