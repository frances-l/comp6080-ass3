import React from 'react';
import {
  TextField, Grid, Button, FormControl, Box, InputBase,
  InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Snackbar, styled, Paper,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { DropzoneArea } from 'material-ui-dropzone';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getQuestion, getQuiz, getToken } from '../utils/helpers';
import NavBar from '../UIComponents/NavBar';
import AppBarSpacer from '../utils/styles';
import API from '../utils/api';

const api = new API('http://localhost:5005');
const FormLayout = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
});

const SecondaryButton = styled(Button)({
  background: 'red',
  color: 'white',
});

const EditQuestion = (props) => {
  const [question, setQuestion] = React.useState({ score: 10, timer: 30, qType: 'single' });
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

  const handleAnswerTextChange = (aId, text) => {
    const updatedQuestion = question;
    const foundAnswer = question.answers.filter((a) => a.id === aId);
    if (foundAnswer.length === 1) {
      const newAnswers = question.answers.map((a) => {
        if (a.id === aId) {
          return { id: aId, answer: text, correct: a.correct };
        }
        return a;
      });
      updatedQuestion.answers = newAnswers;
    } else {
      const newAns = { id: aId, text, correct: false };
      updatedQuestion.answers.push(newAns);
    }

    setQuestion(updatedQuestion);
  };

  const handleAnswerCorrectChange = (aId, isCorrect) => {
    const updatedQuestion = question;
    const foundAnswer = question.answers.filter((a) => a.id === aId);
    if (foundAnswer.length === 1) {
      const newAnswers = question.answers.map((a) => {
        if (a.id === aId) {
          return { id: aId, answer: a.text, correct: isCorrect };
        }
        return a;
      });
      updatedQuestion.answers = newAnswers;
      setQuestion(updatedQuestion);
    } else {
      const newAns = { id: aId, text: '', correct: isCorrect };
      updatedQuestion.answers.push(newAns);
    }

    setQuestion(updatedQuestion);
  };

  React.useEffect(() => {
    (async () => {
      // get the quiz
      const res = await getQuiz(params.gid);
      // if the quiz has questions, setQuestion to the correct question we want to edit
      const questionCheck = getQuestion(res.questions, params.qid);
      console.log(questionCheck);
      if (questionCheck) {
        console.log('setting question from questionCheck');
        setQuestion(questionCheck);
      // otherwise if we're adding a new question
      } else {
        // add a placeholder question so we can manipulate it
        console.log('setting placeholder question');
        setQuestion({
          id: params.qid,
          qType: 'single',
          question: '',
          score: 10,
          time: 30,
          media: '',
          answers: [],
        });
      }
    })();
  }, [params.gid, params.qid]);

  const handleConfirm = async () => {
    if (!open) {
      const quiz = await getQuiz(params.gid);
      const qExist = quiz.questions.find((q) => q.id === params.qid);
      // if there are already questions
      if (qExist) {
        const quizQuestions = quiz.questions.map((q) => {
          if (q.id === params.qid) {
            return question;
          }
          return q;
        });
        quiz.questions = quizQuestions;
      } else {
        quiz.questions = [...quiz.questions, question];
      }

      console.log(quiz);
      console.log(quiz.questions);
      console.log(params.gid);
      const res = await api.put(`admin/quiz/${params.gid}`, {
        headers: { 'Content-type': 'application/json', Authorization: getToken() },
        body: JSON.stringify({
          questions: quiz.questions,
          name: 'yo',
          thumbnail: quiz.thumbnail,
        }),
      });
      console.log(res);
      history.push(`/edit/${params.gid}`);
    }
  };
  // if we're editting a previous question
  return (
    <section>
      <NavBar />
      <AppBarSpacer />
      <FormLayout container direction="row">
        <Grid container item direction="column">
          <Grid item xs={8}>
            <TextField
              variant="filled"
              fullWidth
              label="Whats your Question?"
              onBlur={(event) => { handleChange('question', event.target.value); }}
            />
          </Grid>
          <Grid item xs={11}>
            <DropzoneArea
              acceptedFiles={['image/*', 'audio/*', 'video/*']}
              dropzoneText="Elevate your question! Click or drag and drop to upload a picture, audio clip, or video!"
              onChange={(file) => { handleChange('media', file); }}
              filesLimit={1}
            />
          </Grid>
        </Grid>
        <Grid container item direction="column" xs={4} justify="space-between">
          <FormControl>
            <InputLabel id="question-type-label">Question Type</InputLabel>
            <Select displayEmpty labelId="question-type-label" id="question-type-select" value={question.qType} onChange={(event) => handleChange('qType', event.target.value)}>
              <MenuItem value="single">Single Choice</MenuItem>
              <MenuItem value="multi">Multiple Choice</MenuItem>
            </Select>
          </FormControl>
          <TextField id="points" value={question.points} onChange={(event) => handleChange('points', event.target.value)} label="Points?" />
          <TextField id="timer" onChange={(event) => handleChange('timer', event.target.value)} label="Question Duration" />
          <Grid item>
            <SecondaryButton variant="contained">Delete Question</SecondaryButton>
          </Grid>
          <Button variant="contained" onClick={handleConfirm}>Confirm Question</Button>
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
              Please Confirm your question before Continuing
            </MuiAlert>
          </Snackbar>
        </Grid>
      </FormLayout>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={6}>
          <Paper>
            <InputBase onChange={(event) => handleAnswerTextChange(1, event.target.value)} variant="filled" required placeholder="Answer 1" />
            <FormControlLabel
              onChange={(event) => handleAnswerCorrectChange(1, event.target.checked)}
              control={<Checkbox />}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <InputBase onChange={(event) => handleAnswerTextChange(2, event.target.value)} variant="filled" required placeholder="Answer 2" />
            <FormControlLabel
              onChange={(event) => handleAnswerCorrectChange(2, event.target.checked)}
              control={<Checkbox />}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <InputBase onChange={(event) => handleAnswerTextChange(3, event.target.value)} variant="filled" required placeholder="Answer 3 (Optional)" />
            <FormControlLabel
              onChange={(event) => handleAnswerCorrectChange(3, event.target.checked)}
              control={<Checkbox />}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <InputBase onChange={(event) => handleAnswerTextChange(4, event.target.value)} variant="filled" required placeholder="Answer 4 (Optional)" />
            <FormControlLabel
              onChange={(event) => handleAnswerCorrectChange(4, event.target.checked)}
              control={<Checkbox />}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <InputBase onChange={(event) => handleAnswerTextChange(5, event.target.value)} variant="filled" required placeholder="Answer 5" />
            <FormControlLabel
              onChange={(event) => handleAnswerCorrectChange(5, event.target.checked)}
              control={<Checkbox />}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <InputBase onChange={(event) => handleAnswerTextChange(6, event.target.value)} variant="filled" required placeholder="Answer 6 (Optional)" />
            <FormControlLabel
              onChange={(event) => handleAnswerCorrectChange(6, event.target.checked)}
              control={<Checkbox />}
            />
          </Paper>
        </Grid>
      </Grid>

    </section>
  );
};

EditQuestion.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EditQuestion;
