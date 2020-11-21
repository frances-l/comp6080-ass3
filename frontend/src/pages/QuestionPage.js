import React from 'react';
import {
  Typography, Container, Grid, CardMedia,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
// eslint-disable-next-line import/no-named-as-default-member
import QuestionAnswers from '../components/QuestionAnswers';
// import API from '../utils/api';
// import { StoreContext } from '../utils/store';
// import { getToken } from '../utils/helpers';

// const api = new API('http://localhost:5005');
// this will interchange with the PlayPage, itll alternate between this and question results
const QuestionPage = ({ setStage, question }) => {
  // so it doesnt scream at me
  // const context = React.useContext(StoreContext);
  // const { session: [session, setSession] } = context;

  console.log(question);
  console.log(question.qType);
  const handleDurationExpire = () => {
    setStage('results');
  };

  return (
    <article>
      {/* Change this navBar to pause game, quit, etc */}
      <Container>
        <Typography color="textPrimary" variant="h1" align="center">{question.question}</Typography>
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
      <Timer duration={Number(question.time)} onComplete={handleDurationExpire} />
      <QuestionAnswers questionAnswers={question.answers} type={question.qType} />
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
