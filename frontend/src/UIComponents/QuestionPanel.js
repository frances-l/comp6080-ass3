import React from 'react';
import {
  TextField, Grid, Button, styled, FormControl,
  InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Box, Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { DropzoneArea } from 'material-ui-dropzone';
import PropTypes from 'prop-types';
import { StoreContext } from '../utils/store';

const FormLayout = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
});

const AnswerContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  background: '#333333',
  color: 'white',
});

const AnswerTextField = styled(TextField)({
  color: 'white',
});

const SideBar = styled(Grid)({
  background: '#363636',
  color: 'white',
});

const SecondaryButton = styled(Button)({
  background: 'red',
  color: 'white',
});

const QuestionPanel = ({ qId }) => {
  const { editQuestion } = React.useContext(StoreContext);
  // const { questionConfirmed } = React.useContext(StoreContext);
  const { questions } = React.useContext(StoreContext);
  const [quizQuestions, setQuizQuestions] = questions;
  // const [confirmed, setConfirmed] = questionConfirmed;
  const [edit, setEdit] = editQuestion;
  const [open, setOpen] = React.useState(false);

  const handleChange = (attr, value) => {
    console.log(value);
    const updatedQuestion = edit;
    updatedQuestion[attr] = value;
    setEdit(updatedQuestion);
    console.log(edit);
  };

  const handleSelect = (event) => {
    handleChange('qType', event.target.value);
  };
  const toggleError = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // before user wants to add a question, they need to confirm the question first
  // if its a valid question, then add the question to the list
  const handleConfirm = () => {
    const doesExist = quizQuestions.filter(((question) => (question.id === qId)));

    if (edit.question && edit.answers && edit.points && edit.time) {
      // there are 2 cases
      // case 1 if the question doesnt already exist in the list
      const newQuestion = edit;
      newQuestion.id = qId;
      let newQuizQuestions;
      if (!doesExist) {
        // just append the question
        newQuizQuestions = [...quizQuestions, newQuestion];
      // case 2 if the question already exists in the list
      } else {
        // find the id of the question and update the values,
        newQuizQuestions = quizQuestions.map((question) => (
          question.id === qId ? newQuestion : question));
      }

      setQuizQuestions(newQuizQuestions);
    } else {
      toggleError();
    }
  };

  return (
    <FormLayout>
      <Grid container item direction="column" xs={6} spacing={1}>
        <Grid item sm={12}>
          <TextField
            variant="filled"
            fullWidth
            label="Whats your Question?"
            defaultValue={edit.question}
            onBlur={(event) => { handleChange('question', event.target.value); }}
          />
        </Grid>
        <Grid item sm={12}>
          <DropzoneArea
            acceptedFiles={['image/*', 'audio/*', 'video/*']}
            dropzoneText="Elevate your question! Click or drag and drop to upload a picture, audio clip, or video!"
            onChange={(file) => { handleChange('media', file); }}
            filesLimit={1}
          />
        </Grid>
        <Grid container item direction="row">
          <Grid item>
            <AnswerContainer>
              <AnswerTextField
                id="answer-1"
                variant="outlined"
                fullWidth
                label="Enter Answers here"
                onChange={(event) => handleChange('answers', event.target.value)}
              />
              <FormControlLabel
                value="ans-1"
                control={<Checkbox />}
                label="Correct Answer"
              />
            </AnswerContainer>
          </Grid>
        </Grid>
      </Grid>
      <SideBar container item direction="row" xs={3} alignContent="space-between">
        <FormControl>
          <InputLabel id="question-type-label">Question Type</InputLabel>
          <Select displayEmpty labelId="question-type-label" id="question-type-select" defaultValue="Single Choice" onChange={handleSelect}>
            <MenuItem value="Single Choice">Single Choice</MenuItem>
            <MenuItem value="Multi Choice">Multiple Choice</MenuItem>
          </Select>
        </FormControl>
        <TextField id="points" onChange={(event) => handleChange('points', event.target.value)} label="How many points is your question worth?" />
        <Grid item>
          <SecondaryButton variant="contained">Delete Question</SecondaryButton>
        </Grid>
        <Button variant="contained" onClick={handleConfirm}>Confirm Question</Button>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
            Please Confirm your question before Continuing
          </MuiAlert>
        </Snackbar>
      </SideBar>
    </FormLayout>
  );
};

QuestionPanel.propTypes = {
  qId: PropTypes.number.isRequired,
};

export default QuestionPanel;
