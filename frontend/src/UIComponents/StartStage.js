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
// import API from '../utils/api';

// const api = new API('http://localhost:5005');
const StartStage = ({
  setStage, sessionId,
}) => {
  const context = React.useContext(StoreContext);
  const { session: [session] } = context;
  const { currQuestion: [, setCurrQuestion] } = context;
  const [players] = React.useState(session.results.players);
  // const { currQuestion: [, setCurrQuestion] } = context;
  // im going to assume, start game will set the position to 0
  const handleStart = async () => {
    // setCurrQuestion(session.results.questions[session.results.position]);
    if (session.results.position === -1) {
      console.log('hello');
      setCurrQuestion(session.results.questions[0]);
    }
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
  // quizId: PropTypes.number.isRequired,
};

export default StartStage;
