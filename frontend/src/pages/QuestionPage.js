import React from 'react';
import {
  Typography, Grid, CardMedia, Divider,
  useTheme, useMediaQuery, makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
import QuestionAnswers from '../components/QuestionAnswers';
import { StoreContext } from '../utils/store';
import NavBar from '../components/NavBar';
import AppBarSpacer from '../utils/styles';

const useStyles = makeStyles((theme) => ({
  pageLayout: {
    padding: '0 5em',
    [theme.breakpoints.down('sm')]: {
      padding: '0 1em',
    },
  },
}));

// this will interchange with the PlayPage, itll alternate between this and question results
const QuestionPage = ({ setStage }) => {
  const context = React.useContext(StoreContext);
  const { currQuestion: [currQuestion] } = context;
  console.log(currQuestion);
  const handleDurationExpire = () => {
    setStage('results');
  };
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <AppBarSpacer />
      <article className={classes.pageLayout}>
        <Grid container direction="column" alignContent="center" justify="center" spacing={5}>
          <Grid item xs={12}>
            <Typography color="textPrimary" variant={matches ? 'h3' : 'h1'} align="center">{currQuestion.question}</Typography>
          </Grid>
          <Divider />
          <Grid
            container
            item
            direction={matches ? 'column' : 'row'}
            alignItems="center"
            justify="center"
            spacing={5}
          >

            <Grid item>
              <Timer
                duration={Number(currQuestion.time)}
                onComplete={handleDurationExpire}
              />
            </Grid>
            <Grid item>
              {(() => {
                if (currQuestion.media.type === 'video') {
                  return <CardMedia component="iframe" title="question-preview-video" src={currQuestion.media.src} />;
                } if (currQuestion.media.src) {
                  return <img src={currQuestion.media.src} alt="question-preview" />;
                }
                return null;
              })()}
            </Grid>
          </Grid>
          <Grid item>
            <QuestionAnswers questionAnswers={currQuestion.answers} type={currQuestion.qType} />
          </Grid>
        </Grid>
      </article>
    </div>
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
