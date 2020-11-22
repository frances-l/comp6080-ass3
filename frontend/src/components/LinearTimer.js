import React from 'react';
import { withStyles, LinearProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      height: 40,
    },
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const LinearTimer = ({ time, handleComplete }) => {
  // to make sure that the timer displays the correct progression
  let progress = 100;
  const renderer = () => {
    progress -= (100 / time) / 2;
    return <BorderLinearProgress variant="determinate" value={progress} />;
  };

  return (
    <Countdown
      autoStart
      date={Date.now() + (time * 1000)}
      renderer={renderer}
      onComplete={() => handleComplete()}
    />
  );
};

LinearTimer.propTypes = {
  time: PropTypes.number.isRequired,
  handleComplete: PropTypes.func.isRequired,
};

export default LinearTimer;
