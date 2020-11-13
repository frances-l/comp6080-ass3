import React from 'react';
import {
  TextField, Grid, Button, styled, Paper, FormControl,
  InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Box,
} from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { StoreContext } from '../utils/store';

const FormLayout = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
});

const QuestionPanel = () => {
  // const context = React.useContext(StoreContext);
  // const { editQuestion: [editQuestion, setEditQuestion] } = context;
  const { editQuestion } = React.useContext(StoreContext);
  const [edit, setEdit] = editQuestion;
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
            acceptedFiles={['image/*']}
            dropzoneText="Elevate your question! Click or drag and drop to upload a picture, audio clip, or video!"
            onChange={(file) => { handleChange('media', file); }}
            filesLimit={1}
          />
        </Grid>
        <Grid container item direction="row">
          <Grid item>
            <Paper>
              <TextField
                id="answer-1"
                variant="filled"
                fullWidth
                label="Enter Answers here"
                onChange={(event) => handleChange('answer', event.target.value)}
              />
              <FormControlLabel
                value="ans-1"
                control={<Checkbox />}
                label="Correct Answer"
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item direction="row" xs={3} alignContent="space-between">
        <FormControl>
          <InputLabel id="question-type-label">Question Type</InputLabel>
          <Select displayEmpty labelId="question-type-label" id="question-type-select" defaultValue="Single Choice" onChange={handleSelect}>
            <MenuItem value="Single Choice">Single Choice</MenuItem>
            <MenuItem value="Multi Choice">Multiple Choice</MenuItem>
          </Select>
        </FormControl>
        <TextField id="points" onChange={(event) => handleChange('points', event.target.value)} label="How many points is your question worth?" />
        <Grid item>
          <Button variant="contained">Delete Question</Button>
        </Grid>
      </Grid>
    </FormLayout>
  );
};

export default QuestionPanel;
