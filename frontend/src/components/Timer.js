import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';

const Timer = ({ duration, onComplete }) => {
  const render = ({ remainingTime }) => (
    <Grid container direction="column" justify="center" alignContent="center" className="timer">
      <Typography color="textPrimary" className="text">Remaining</Typography>
      <Typography variant="h4" className="value">{remainingTime}</Typography>
      <Typography color="textPrimary" className="text">seconds</Typography>
    </Grid>
  );
  return (
    <CountdownCircleTimer
      onComplete={() => { onComplete(); }}
      isPlaying
      duration={duration}
      colors={[['#0080FF', 0.66], ['#FF4500', 0.33]]}
    >
      {render}
    </CountdownCircleTimer>
  );
};

Timer.propTypes = {
  duration: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default Timer;
