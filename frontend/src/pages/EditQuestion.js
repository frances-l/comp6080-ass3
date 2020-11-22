import React from 'react';
import {
  TextField, Grid, makeStyles, Button,
  Snackbar, Paper, useTheme, useMediaQuery,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getQuiz, getToken } from '../utils/helpers';
import NavBar from '../components/NavBar';
import AppBarSpacer from '../utils/styles';
import API from '../utils/api';
import EditAnswers from '../components/EditAnswers';
import { StoreContext } from '../utils/store';
import MediaZone from '../components/MediaZone';
import EditQuestionSideBar from '../components/EditQuestionSideBar';
import EditQuestionBarDrawer from '../components/EditQuestionBarDrawer';

const api = new API('http://localhost:5005');

const useStyles = makeStyles((theme) => ({
  pageLayout: {
    margin: '0 10vw 3vh 10vw',
  },
  sidebar: {
    backgroundColor: 'rgb(62,62,66)',
    padding: '1em',
    borderRadius: '0.5em',
  },
  answersContainer: {
    backgroundColor: 'rgb(24,25,26)',
    padding: '1em',
    marginTop: '1em',
  },
  formLayout: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  buttonGroup: {
    height: '5em',
  },
}));

const EditQuestion = (props) => {
  const context = React.useContext(StoreContext);
  const { edit: [edit] } = context;
  const [question, setQuestion] = React.useState(edit);
  const [open, setOpen] = React.useState(false);
  const { match: { params } } = props;
  const history = useHistory();

  const handleChange = (attr, value) => {
    const updatedQuestion = question;
    updatedQuestion[attr] = value;
    setQuestion(updatedQuestion);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleCancel = () => {
  //   history.push(`/edit/${params.gid}`);
  // };

  const setQtype = () => question.answers.filter((a) => a.correct).length === 1;
  const handleConfirm = async () => {
    if (!open) {
      // check if the new question has more than one answer then change the type accordingly
      question.qType = setQtype() ? 'single' : 'multi';
      // first find all of the quizzes
      const quiz = await getQuiz(params.gid);
      const qExist = quiz.questions.find((q) => Number(q.id) === Number(params.qid));

      // if we're editting a question, then set the editted question
      if (qExist) {
        const quizQuestions = quiz.questions.map((q) => {
          if (q.id === params.qid) {
            return question;
          }
          return q;
        });
        quiz.questions = quizQuestions;
      // otherwise we're adding a new question so just append it.
      } else {
        quiz.questions = [...quiz.questions, question];
      }

      const res = await api.put(`admin/quiz/${params.gid}`, {
        headers: { 'Content-type': 'application/json', Authorization: getToken() },
        body: JSON.stringify({
          questions: quiz.questions,
          name: quiz.name,
          thumbnail: quiz.thumbnail,
        }),
      });
      if (res.error) {
        setOpen(true);
      }
      history.push(`/edit/${params.gid}/`);
    }
  };
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  // if we're editting a previous question
  return (
    <section className={classes.pageLayout}>
      <NavBar />
      <AppBarSpacer />
      <Grid container direction={matches ? 'column' : 'row'} spacing={2}>
        <Grid container item direction="column" spacing={2} xs={matches ? 12 : 8}>
          <Grid item xs={12}>
            <TextField
              variant="filled"
              fullWidth
              label="Whats your Question?"
              onBlur={(event) => { handleChange('question', event.target.value); }}
              defaultValue={edit.question}
            />
          </Grid>
          <Grid item>
            <MediaZone question={question} setQuestion={setQuestion} />
          </Grid>
        </Grid>
        {matches
          ? (
            <EditQuestionBarDrawer
              handleChange={handleChange}
              handleConfirm={handleConfirm}
              gId={params.gid}
            />
          )
          : (
            <EditQuestionSideBar
              handleChange={handleChange}
              handleConfirm={handleConfirm}
              gId={params.gid}
            />
          )}
      </Grid>
      <Paper className={classes.answersContainer}>
        <Grid container direction="row" spacing={2}>
          <EditAnswers aId={1} question={question} setQuestion={setQuestion} />
          <EditAnswers aId={2} question={question} setQuestion={setQuestion} />
          <EditAnswers aId={3} question={question} setQuestion={setQuestion} />
          <EditAnswers aId={4} question={question} setQuestion={setQuestion} />
          <EditAnswers aId={5} question={question} setQuestion={setQuestion} />
          <EditAnswers aId={6} question={question} setQuestion={setQuestion} />
        </Grid>
      </Paper>
      { matches && (
      <Grid container direction="row" spacing={1}>
        <Grid item xs={6}>
          <Button
            className={classes.buttonGroup}
            fullWidth
            onClick={() => { history.push(`/edit/${params.gid}`); }}
            size="large"
            variant="contained"
            color="secondary"
          >
            Cancel

          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            className={classes.buttonGroup}
            fullWidth
            color="primary"
            variant="contained"
            onClick={handleConfirm}
            size="large"
          >
            Confirm

          </Button>
        </Grid>
      </Grid>
      ) }

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
          Please Confirm your question before Continuing
        </MuiAlert>
      </Snackbar>
    </section>
  );
};

EditQuestion.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EditQuestion;
