import {
  Typography, Button, Modal, makeStyles,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import API from '../utils/api';
import { StoreContext } from '../utils/store';
import Answer from '../components/Answer';
import { getToken } from '../utils/helpers';

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
  const { session: [session] } = context;
  const { currQuestion: [, setCurrQuestion] } = context;
  const [answers, setAnswers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();
  // make this only visible/possible from admin
  const handleClick = async () => {
    // handle pressing next in results page
    // should advance the game, and set the question to the next one
    const results = await api.get(`admin/session/${sId}/status`, { headers: { Authorization: getToken() } });
    const nextQuestion = results.results.questions[results.results.position + 1];
    if (!nextQuestion) {
      console.log('hello');
      setOpen(true);
      // history.push(`/session/${sId}/results`);
    } else {
      setCurrQuestion(nextQuestion);
      setStage('preview');
    }
  };

  React.useEffect(() => {
    (async () => {
      console.log(session);
      const result = await api.get(`play/${player}/answer`, { headers: { Authorization: getToken() } });
      console.log(result);
      setAnswers(result.answerIds);
    })();
  }, [player, session]);

  const handleClose = () => {
    setOpen(false);
  };

  const dashboard = () => {
    history.push('/');
  };

  return (
    <main>
      <Typography variant="h1">How did you do?</Typography>
      <Typography variant="h5">The correct Answer(s) are..</Typography>
      {answers.map((a) => (
        <Answer
          key={`answer-${a.id}`}
          id={a.id}
          text={a.answer}
          answers={[]}
          setAnswers={setAnswers}
          className={`answer-${a.id}`}
        />
      ))}
      <Button onClick={() => { handleClick(); }}>Next Question</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="redirect to homepage"
        aria-describedby="redirect to homepage modal"
      >
        <main className={classes.paper}>
          <Typography variant="h4">The game has ended! Click on the button to return back to the dashboard to view results.</Typography>
          <Button variant="outlined" onClick={() => dashboard()}>Go back to dashboard</Button>
        </main>
      </Modal>
    </main>
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
