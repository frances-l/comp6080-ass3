import React from 'react';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import PropTypes from 'prop-types';
import {
  Typography, Container, Grid, Button, makeStyles, Divider, useTheme, useMediaQuery,
} from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { getQuizId, getToken } from '../utils/helpers';
import { StoreContext } from '../utils/store';
import API from '../utils/api';
import NavBar from '../components/NavBar';
import ErrorHandler from '../components/ErrorHandler';

const useStyles = makeStyles((theme) => ({
  appbarSpacer: {
    ...theme.mixins.toolbar,
  },
}));

const api = new API('http://localhost:5005');
const StartStage = ({
  setStage, sessionId,
}) => {
  const context = React.useContext(StoreContext);
  const { currQuestion: [, setCurrQuestion] } = context;
  const { player: [player] } = context;
  const { apiError: [, setApiError] } = context;

  const handleStart = async () => {
    const results = await api.get(`admin/session/${sessionId}/status`, { headers: { Authorization: getToken() } });
    if (results.results.position === -1) {
      setCurrQuestion(results.results.questions[0]);
    }
    const quizId = await getQuizId(sessionId);
    await api.post(`admin/quiz/${quizId}/advance`, { headers: { Authorization: getToken() } });
    if (results.error || quizId.error) {
      setApiError({ error: true, message: results.error ? results.error : quizId.error });
    }
    setStage('preview');
  };
  // poll the server to check if the game has started
  React.useEffect(() => {
    // function to check if the game has started or not
    // if it has then set the stage to preview
    // player will only ever get to start stage if the game hasnt started already
    const checkIfGameStart = async () => {
      const started = await api.get(`play/${player.id}/status`);
      if (started.error) {
        setApiError({ error: true, message: started.error });
      }
      if (started.started) {
        // once the game starts, we can start the game here
        const question = await api.get(`play/${player.id}/question`);
        setCurrQuestion(question.question);
        setStage('preview');
      }
    };
    // we only need to poll the server if the user isnt an admin
    let interval;
    if (!player.isAdmin) {
      interval = setInterval(() => checkIfGameStart(), 500);
    }

    return () => clearInterval(interval);
  }, [player.id, player.isAdmin, setApiError, setCurrQuestion, setStage]);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <NavBar />
      <div className={classes.appbarSpacer} />
      <Container className={classes.hello}>
        <Grid container direction="column" spacing={10}>
          <Grid item>
            <Typography color="textPrimary" variant={matches ? 'h3' : 'h1'}>So You think you have a BigBrain?</Typography>
          </Grid>
          <Divider />
          <Grid item>
            <Typography color="textPrimary" variant={matches ? 'h5' : 'h4'}>
              Want to invite some friends? Use this session id:
              {sessionId}
            </Typography>
          </Grid>
          <Divider />
          <Grid container item>
            <Typography variant="h5" color="textPrimary">{`This is you! ${player.name}`}</Typography>
            <EmojiPeopleIcon fontSize="large" color="primary" />
          </Grid>
          <Grid item>
            {player.isAdmin
              ? <Button color="primary" variant="contained" onClick={() => handleStart()}>Start the Game!</Button>
              : <Typography color="textPrimary"> Waiting for the host to start...</Typography>}
          </Grid>
        </Grid>
      </Container>
      <ErrorHandler />
    </div>
  );
};
StartStage.propTypes = {
  setStage: PropTypes.func.isRequired,
  sessionId: PropTypes.number.isRequired,
  // quizId: PropTypes.number.isRequired,
};

export default StartStage;
