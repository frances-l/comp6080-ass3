import React from 'react';
import {
  Grid, Button, makeStyles, Box, TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import NavBar from '../frontend/src/UIComponents/NavBar';
// import QuestionsTab from '../UIComponents/QuestionsTab';
import API from '../frontend/src/utils/api';
import getToken from '../frontend/src/utils/helpers';
import QuestionPanel from './QuestionPanel';
import QuizNav from './QuizNav';
import { StoreContext, } from '../frontend/src/utils/store';

const api = new API('http://localhost:5005');

// note for future reference,
// giving up on this shit for now cuz its fucking annoying me and taking too much time
// need to finish the way we handle answers in QuestionPanel.js
// need to finish the way we confirm questions with edit
// the way it works is that the page is split up into 3 portions
// first part is the page itself
// this consists of a side bar (Quiz Bar) that contains buttons that links to each question in quiz
// also has a button to add a new question to the quiz and to confirm
// button that links to question works-ish, confirm should be simple. Do need to handle errors still
// Main portion of page is the actualy part where we edit
// from this you can edit the quiz title (from any question you're edditing)
// you can set/change question, upload media/files, answers, time, question type, delete question
// and confirm. Confirm is difficult theres alot of different ways we can do it
// I think it should be each time a user makes a change they have to confirm the question before
// doing ANYTHING else or i guess lose what they've done (i havent thought on how to do that yet)
// also might add a new button on the side bar to add optional answers
// easier thing to do is just to have them all there already, and set them as optional.
// also choosing the answers has to be dynamic in relation to the questionType
// ie if its a single choice answer, then we should create the answers with radio buttons
// if they change to multiple choice answers, then we should create the answers with select boxes

const useStyles = makeStyles((theme) => ({
  sidebar: {
    background: '#363636',
    color: 'white',
    maxWidth: '20vw',
  },
  text: {
    color: 'white',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  appBarSpacer: theme.mixins.toolbar,
}));

function EditQuestion (props) {
  const { questions, } = React.useContext(StoreContext);
  const [quizQuestions, setQuizQuestions,] = questions;
  const { match: { params, }, } = props;
  // figure out a way to get the quiz title
  const [quizTitle, setQuizTitle,] = React.useState('');
  const handleClick = () => {
    // first we need to check that all of the questions are valid
    const quiz = { questions: quizQuestions, name: quizTitle, };
    api.put(`admin/quiz/${params.gid}`, { body: quiz, });
  };

  React.useEffect(() => {
    (async () => {
      const res = await api.get(`admin/quiz/${params.gid}`, { headers: { Authorization: getToken(), }, });
      console.log(res);
      if (res.questions.length > 1) {
        console.log(res.questions);
        setQuizQuestions(res.questions);
      } else {
        const questionPlaceholder = {
          id: 0, question: '', qType: 'single', answers: [], points: 0, media: '', time: 0,
        };
        console.log('setting Questions');
        setQuizQuestions([questionPlaceholder,]);
      }
      setQuizTitle(res.name);
    })();
  }, [params.gid, setQuizQuestions, setQuizTitle,]);

  console.log(quizTitle);
  const classes = useStyles();

  return (
    <main>
      <NavBar />
      <div className={classes.appBarSpacer} />
      <Box className={classes.container}>
        <Grid
          container
          direction="column"
          role="navigation"
          className={classes.sidebar}
        >
          <Grid item>
            <QuizNav quizId={Number(params.gid)} questionId={Number(params.qid)} />
            {/* <Button color="inherit"
            fullWidth variant="outlined" onClick={handleAddQuestionClick}>Add Question</Button> */}
            <Button color="inherit" fullWidth variant="outlined" onClick={handleClick}>Confirm Quiz</Button>
          </Grid>
        </Grid>
        <Grid container>
          <TextField fullWidth label="Quiz Title" defaultValue={quizTitle} />
          <QuestionPanel />
        </Grid>
      </Box>
    </main>
  );
}

EditQuestion.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EditQuestion;
