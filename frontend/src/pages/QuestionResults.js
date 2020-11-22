import {
  Typography, Button, Modal, makeStyles, Grid, useTheme, useMediaQuery,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import API from '../utils/api';
import { StoreContext } from '../utils/store';
import Answer from '../components/Answer';
import { getQuizId, getToken } from '../utils/helpers';
import NavBar from '../components/NavBar';
import AppBarSpacer from '../utils/styles';

const api = new API('http://localhost:5005');

const useStyles = makeStyles((theme) => ({
  paper: {
    // position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: 'auto',
  },
}));

// this component will interchange with the p
const QuestionResults = ({
  // question, setNextQuestion, sId, gId,
  setStage, sId,
}) => {
  // console.log(question);
  const context = React.useContext(StoreContext);
  const { player: [player] } = context;
  const { session: [session, setSession] } = context;
  const { currQuestion: [currQuestion, setCurrQuestion] } = context;
  const { playerAnswers: [playerAnswers, setPlayerAnswers] } = context;

  const [answers, setAnswers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();
  // make this only visible/possible from admin
  const handleClick = async () => {
    // handle pressing next in results page
    // should advance the game, and set the question to the next one
    const results = await api.get(`admin/session/${sId}/status`, { headers: { Authorization: getToken() } });
    console.log('printing session from questionResults', results);
    setSession(results);
    const nextQuestion = results.results.questions[results.results.position + 1];
    if (!nextQuestion) {
      setOpen(true);
      // history.push(`/session/${sId}/results`);
    } else {
      const quizId = await getQuizId(sId);
      await api.post(`admin/quiz/${quizId}/advance`, { headers: { Authorization: getToken() } });
      setCurrQuestion(nextQuestion);
      setPlayerAnswers([]);
      setStage('preview');
    }
  };
  // set the answers
  React.useEffect(() => {
    (async () => {
      const result = await api.get(`play/${player.id}/answer`, { headers: { Authorization: getToken() } });
      console.log(result);
      setAnswers(result.answerIds);
    })();
  }, [player, session]);

  React.useEffect(() => {
    // function to check if the game has started or not
    // if it has then set the stage to preview
    // player will only ever get to start stage if the game hasnt started already
    const checkIfGameStart = async () => {
      const question = await api.get(`play/${player.id}/question`);
      const status = await api.get(`play/${player.id}/status`);
      if (!status.started) {
        setOpen(true);
      } else if (question.question.id !== currQuestion.id) {
        setPlayerAnswers([]);
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
  }, [currQuestion, currQuestion.position, player.id,
    player.isAdmin, setCurrQuestion, setPlayerAnswers, setStage]);

  const handleClose = () => {
    setOpen(false);
  };

  const dashboard = () => {
    history.push('/');
  };

  const handleAnswers = (answer) => {
    // answer is every choice of answer for the question
    // playerAnswers is the answers that the player chose
    // answers contains the correct answers for the question
    // first we check if the player answered correctly
    // extract the answer first
    console.log(playerAnswers);
    if (playerAnswers.length === 0) {
      const isCorrect = answers.find((a) => a === answer.id);
      if (isCorrect) {
        return 'correctAnswer';
      }
      return 'neutralAnswer';
    }

    const chosen = playerAnswers.find((a) => a === answer.id);
    // if player chose this answer
    if (chosen) {
      console.log(chosen);
      // check if answer is correct
      console.log(answers);
      const correct = answers.find((a) => a === chosen);
      console.log(correct);
      // if its correct then return correct answer
      if (correct) {
        console.log('here');
        return 'correctAnswer';
      // otherweise its wrong
      }
      console.log('yikes');
      return 'incorrectAnswer';

      // if player didnt choose this answer
    }
    // check if the non chosen answer is correct
    if (answers.find((a) => a === answer.id)) {
      return 'correctAnswer';
    }
    // otherwise its just neutral
    return 'neutralAnswer';
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <AppBarSpacer />
      <main className={classes.pageLayout}>
        <Grid container direction="column" alignContent="center" spacing={5}>
          <Grid item>
            <Typography color="textPrimary" variant={matches ? 'h3' : 'h1'}>How did you do?</Typography>
          </Grid>
          <Grid item>
            <Typography color="textPrimary" variant="h5">The correct Answer(s) are..</Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={1}>
              {currQuestion.answers.map((a) => (
                <Answer
                  key={`answer-${a.id}`}
                  id={a.id}
                  text={a.answer}
                  className={(() => handleAnswers(a))()}
                />
              ))}
            </Grid>
          </Grid>
          <Grid item>
            {player.isAdmin
              ? (
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => { handleClick(); }}
                >
                  Next Question
                </Button>
              )
              : <Typography color="textPrimary">Waiting for host to proceed...</Typography>}
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="redirect to homepage"
            aria-describedby="redirect to homepage modal"
          >
            <main className={classes.paper}>
              <Typography color="textPrimary" variant="h4">The game has ended! Click on the button to return back to the dashboard to view results.</Typography>
              <Button color="primary" variant="outlined" onClick={() => dashboard()}>Go back to dashboard</Button>
            </main>
          </Modal>
        </Grid>
      </main>
    </div>
  );
};

QuestionResults.propTypes = {
  // question: PropTypes.objectOf(PropTypes.any).isRequired,
  setStage: PropTypes.func.isRequired,
  // setNextQuestion: PropTypes.func.isRequired,
  sId: PropTypes.number.isRequired,
  // gId: PropTypes.number.isRequired,
};
export default QuestionResults;
