import React from 'react';
import {
  TextField, Grid, Button, FormControl, Box,
  InputLabel, Select, MenuItem, Snackbar, styled,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { DropzoneArea } from 'material-ui-dropzone';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getQuestion, getQuiz, getToken } from '../utils/helpers';
import NavBar from '../UIComponents/NavBar';
import AppBarSpacer from '../utils/styles';
import API from '../utils/api';
import EditAnswers from '../components/EditAnswers';
import { StoreContext } from '../utils/store';

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
  const context = React.useContext(StoreContext);
  const { edit: [edit] } = context;
  const [question, setQuestion] = React.useState(edit);
  const [open, setOpen] = React.useState(false);
  console.log(question);
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
        // setDefaultValues(questionCheck);
      // otherwise if we're adding a new question
      } else {
        // add a placeholder question so we can manipulate it
        console.log('setting placeholder question');
        const defVal = {
          id: params.qid,
          qType: 'single',
          question: '',
          score: 10,
          time: 30,
          media: '',
          answers: [],
        };
        setQuestion(defVal);
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
  console.log(question);
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
              defaultValue={question.question}
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
          <TextField defaultValue={question.points} id="points" onChange={(event) => handleChange('points', event.target.value)} label="Points?" />
          <TextField defaultValue={question.time} id="timer" onChange={(event) => handleChange('time', event.target.value)} label="Question Duration" />
          <Grid item>
            <SecondaryButton variant="contained">Cancel</SecondaryButton>
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
        <EditAnswers aId={1} question={question} setQuestion={setQuestion} />
        <EditAnswers aId={2} question={question} setQuestion={setQuestion} />
        <EditAnswers aId={3} question={question} setQuestion={setQuestion} />
        <EditAnswers aId={4} question={question} setQuestion={setQuestion} />
        <EditAnswers aId={5} question={question} setQuestion={setQuestion} />
        <EditAnswers aId={6} question={question} setQuestion={setQuestion} />
      </Grid>

    </section>
  );
};

EditQuestion.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EditQuestion;
