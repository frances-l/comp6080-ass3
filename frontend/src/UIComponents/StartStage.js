import React from 'react';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import PropTypes from 'prop-types';
import {
  Typography, Container, Grid, Button,
} from '@material-ui/core';
import { getToken } from '../utils/helpers';
import { StoreContext } from '../utils/store';
import API from '../utils/api';

const api = new API('http://localhost:5005');
const StartStage = ({
  setStage, sessionId,
}) => {
  const context = React.useContext(StoreContext);
  const { session: [session] } = context;
  const { currQuestion: [, setCurrQuestion] } = context;
  const [players, setPlayers] = React.useState(session.results.players);
  const { player: [player] } = context;
  const handleStart = async () => {
    if (session.results.position === -1) {
      setCurrQuestion(session.results.questions[0]);
    }
    const results = await api.get(`admin/session/${sessionId}/status`, { headers: { Authorization: getToken() } });
    console.log(results);
    setStage('preview');
  };
  // poll the server to check if the game has started
  React.useEffect(() => {
    // function to check if the game has started or not
    // if it has then set the stage to preview
    // player will only ever get to start stage if the game hasnt started already
    const checkIfGameStart = async () => {
      const started = await api.get(`play/${player.id}/status`);
      if (started.started) {
        setStage('preview');
      }
    };
    // we only need to poll the server if the user isnt an admin
    let interval;
    if (!player.isAdmin) {
      interval = setInterval(() => checkIfGameStart(), 500);
    }

    return () => clearInterval(interval);
  }, [player.id, player.isAdmin, setStage]);

  // poll the server to see if anyone else has joined the game
  React.useEffect(() => {
    const checkJoined = async () => {
      const results = await api.get(`admin/session/${sessionId}/status`, { headers: { Authorization: getToken() } });
      setPlayers(results.results.players);
    };
    const interval = setInterval(() => checkJoined(), 1000);
    return () => clearInterval(interval);
  }, [sessionId]);
  return (
    <div>
      <Container>
        <Grid container direction="column">
          <Grid item>
            <Typography color="textPrimary" variant="h1">So You think you have a BigBrain?</Typography>
          </Grid>
          <Grid item>
            <Typography color="textPrimary" variant="h4">{sessionId}</Typography>
          </Grid>
          <Grid container item>
            {players.map((playerName, i) => {
              const key = `${playerName}-${i}`;
              return (
                <Grid key={key} item xs={3}>
                  <Typography color="textPrimary">{playerName}</Typography>
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
