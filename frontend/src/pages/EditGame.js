import React from 'react';
import {
  Grid, Button, makeStyles, Box, TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import NavBar from '../UIComponents/NavBar';
// import QuestionsTab from '../UIComponents/QuestionsTab';
import API from '../utils/api';
import getToken from '../utils/helpers';
import QuestionPanel from '../UIComponents/QuestionPanel';
import QuizNav from '../UIComponents/QuizNav';
import { StoreContext } from '../utils/store';

const api = new API('http://localhost:5005');

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

function EditGame(props) {
  // const [newQuestion, setNewQuestion] = React.useState({});
  // const context = React.useContext(StoreContext);
  // const { questions: [questions, setQuestions] } = context;
  // const { editQuestion: [editQuestion] } = context;
  const { questions } = React.useContext(StoreContext);
  const [quizQuestions, setQuizQuestions] = questions;
  const { match: { params } } = props;
  const [quizTitle, setQuizTitle] = React.useState('');
  const handleClick = () => {
    // first we need to check that all of the questions are valid
    const quiz = { questions: quizQuestions, name: quizTitle };
    api.put(`admin/quiz/${params.gid}`, { body: quiz });
  };

  React.useEffect(() => {
    (async () => {
      const res = await api.get(`admin/quiz/${params.gid}`, { headers: { Authorization: getToken() } });
      console.log(res);
      if (res.questions.length > 1) {
        console.log(res.questions);
        setQuizQuestions(res.questions);
      } else {
        const questionPlaceholder = {
          id: 0, question: '', qType: 'single', answers: [], points: 0, media: '',
        };
        console.log('setting Questions');
        setQuizQuestions([questionPlaceholder]);
      }
      setQuizTitle(res.name);
    })();
  }, [params.gid, setQuizQuestions, setQuizTitle]);

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

EditGame.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EditGame;
