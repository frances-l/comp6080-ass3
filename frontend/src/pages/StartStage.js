import React from 'react';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import PropTypes from 'prop-types';
import {
  Typography, Container, Grid, Button,
} from '@material-ui/core';
import { getQuizId, getToken } from '../utils/helpers';
import { StoreContext } from '../utils/store';
import API from '../utils/api';

const api = new API('http://localhost:5005');
const StartStage = ({
  setStage, sessionId,
}) => {
  const context = React.useContext(StoreContext);
  const { currQuestion: [, setCurrQuestion] } = context;
  // const [players, setPlayers] = React.useState(session.results.players);
  const { player: [player] } = context;

  const handleStart = async () => {
    const results = await api.get(`admin/session/${sessionId}/status`, { headers: { Authorization: getToken() } });
    if (results.results.position === -1) {
      setCurrQuestion(results.results.questions[0]);
    }
    console.log('advancing Quiz');
    const quizId = await getQuizId(sessionId);
    await api.post(`admin/quiz/${quizId}/advance`, { headers: { Authorization: getToken() } });
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
            {/* {players.map((playerName, i) => {
              const key = `${playerName}-${i}`;
              return (
                <Grid key={key} item xs={3}>
                  <Typography color="textPrimary">{playerName}</Typography>
                </Grid>
              );
            })} */}
            <Typography color="textPrimary">{`This is you! ${player.name}`}</Typography>
          </Grid>
          {player.isAdmin
            ? <Button onClick={() => { handleStart(); }}>Start the Game!</Button>
            : <Typography color="textPrimary"> Waiting for the host to start...</Typography>}
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
