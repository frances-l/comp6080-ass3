import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import PropTypes from 'prop-types';

const Timer = ({ duration, onComplete }) => {
  const render = ({ remainingTime }) => (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
  return (
    <CountdownCircleTimer
      onComplete={() => { onComplete(); }}
      isPlaying
      duration={duration}
      colors="#A30000"
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
