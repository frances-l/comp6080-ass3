import React from 'react';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import PropTypes from 'prop-types';
import {
  Typography, Container, Grid, Button,
} from '@material-ui/core';
// import API from '../utils/api';
// import { getToken } from '../utils/helpers';
import { StoreContext } from '../utils/store';

// const api = new API('http://localhost:5005');

const StartStage = ({
  setStage, sessionId,
}) => {
  const context = React.useContext(StoreContext);
  const { session: [session] } = context;
  const [players] = React.useState(session.players);

  // im going to assume, start game will set the position to 0
  const handleStart = async () => {
    // if starting a fresh quiz, we need to advance the position
    setStage('preview');
  };

  return (
    <div>
      <Container>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h1">So You think you have a BigBrain?</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4">{sessionId}</Typography>
          </Grid>
          <Grid container item>
            {players.map((playerName, i) => {
              const key = `${playerName}-${i}`;
              return (
                <Grid key={key} item xs={3}>
                  <Typography>{playerName}</Typography>
                </Grid>
              );
            })}
          </Grid>
          <Button onClick={() => { handleStart(); }}>Start the Game!</Button>
        </Grid>
      </Container>
    </div>
  );
};
StartStage.propTypes = {
  setStage: PropTypes.func.isRequired,
  sessionId: PropTypes.number.isRequired,
};

export default StartStage;
