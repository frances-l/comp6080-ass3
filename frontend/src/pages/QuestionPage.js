import React from 'react';
import {
  Typography, Grid, CardMedia,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
// eslint-disable-next-line import/no-named-as-default-member
import QuestionAnswers from '../components/QuestionAnswers';
// import API from '../utils/api';
import { StoreContext } from '../utils/store';
// import { getToken } from '../utils/helpers';

// const api = new API('http://localhost:5005');
// this will interchange with the PlayPage, itll alternate between this and question results
const QuestionPage = ({ setStage }) => {
  const context = React.useContext(StoreContext);
  const { currQuestion: [currQuestion] } = context;
  console.log(currQuestion);
  const handleDurationExpire = () => {
    setStage('results');
  };

  return (
    <article>
      {/* Change this navBar to pause game, quit, etc */}
      <Grid container direction="column">
        {/* <Container> */}
        <Grid item xs={12}>
          <Typography color="textPrimary" variant="h1" align="center">{currQuestion.question}</Typography>
        </Grid>
        <Grid container item direction="row">
          <Grid item xs={4}>
            <Timer duration={Number(currQuestion.time)} onComplete={handleDurationExpire} />
          </Grid>
          <Grid item xs={6}>
            {(() => {
              if (currQuestion.media.type === 'video') {
                return <CardMedia component="iframe" title="question-preview-video" src={currQuestion.media.src} />;
              } if (currQuestion.media.src) {
                return <img src={currQuestion.media.src} alt="question-preview" />;
              }
              return null;
            })()}
          </Grid>
          {/* </Container> */}
        </Grid>
        <Grid item>
          <QuestionAnswers questionAnswers={currQuestion.answers} type={currQuestion.qType} />
        </Grid>
      </Grid>
    </article>
  );
};

QuestionPage.propTypes = {
  setStage: PropTypes.func.isRequired,
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
