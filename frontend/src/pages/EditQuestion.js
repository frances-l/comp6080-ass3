import React from 'react';
import {
  TextField, Grid, Button, FormControl, Box, InputBase,
  InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Snackbar, styled, Paper,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { DropzoneArea } from 'material-ui-dropzone';
import PropTypes from 'prop-types';
import { StoreContext } from '../utils/store';
import { getQuestion } from '../utils/helpers';
import NavBar from '../UIComponents/NavBar';
// import PropTypes from 'prop-types';
import AppBarSpacer from '../utils/styles';

const FormLayout = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
});

const SecondaryButton = styled(Button)({
  background: 'red',
  color: 'white',
});

const EditQuestion = (props) => {
  const [question, setQuestion] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const { questions } = React.useContext(StoreContext);
  const [allQuestions, setAllQuestions] = questions;
  const { match: { params } } = props;

  const handleChange = (attr, value) => {
    const updatedQuestion = question;
    updatedQuestion[attr] = value;
    setQuestion(updatedQuestion);
  };

  const handleSelect = (event) => {
    console.log(event.target.value);
    handleChange('qType', event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    let currQuestion = getQuestion(allQuestions, params.qid);
    if (!currQuestion) {
      // if we're creating a new question
      // allQuestions will be empty, so we need to set place holders so we can correctly
      // render the default values of question type, points and timer.
      currQuestion = {
        id: allQuestions.length, question: '', qType: 'single', answers: [], points: 10, media: '', time: 30,
      };
    }
    setQuestion(currQuestion);
  }, [allQuestions, params.qid]);

  const handleConfirm = () => {
    if (!open) {
      setAllQuestions(question);
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
            <Select displayEmpty labelId="question-type-label" id="question-type-select" defaultValue="Single Choice" onChange={handleSelect}>
              <MenuItem value="single">Single Choice</MenuItem>
              <MenuItem value="multi">Multiple Choice</MenuItem>
            </Select>
          </FormControl>
          <TextField id="points" onChange={(event) => handleChange('points', event.target.value)} label="Points?" />
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
            <InputBase variant="filled" required placeholder="Answer 1" />
            <FormControlLabel control={<Checkbox />} />
          </Paper>
        </Grid>
        <Grid item xs={6} justify="spaced-between">
          <Paper>
            <TextField variant="filled" placeholder="Answer 2" />
            <FormControlLabel control={<Checkbox />} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <TextField variant="filled" placeholder="Answer 1 (Optional)" />
            <FormControlLabel control={<Checkbox />} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <TextField variant="filled" placeholder="Answer 4 (Optional)" />
            <FormControlLabel control={<Checkbox />} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <TextField variant="filled" placeholder="Answer 5 (Optional)" />
            <FormControlLabel control={<Checkbox />} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <TextField variant="filled" placeholder="Answer 6 (Optional)" />
            <FormControlLabel control={<Checkbox />} />
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
