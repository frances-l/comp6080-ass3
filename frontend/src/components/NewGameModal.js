import React from 'react';
import {
  Typography, Button, InputLabel, Input,
  Container, FormControl, Paper, Grid, Divider, styled, makeStyles, Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getToken } from '../utils/helpers';
import API from '../utils/api';
import { StoreContext } from '../utils/store';

const api = new API('http://localhost:5005');

const ModalGrid = styled(Grid)({
  padding: '2em',
});

const useStyles = makeStyles(() => ({
  upload: {
    display: 'none',
  },
}));
const { Validator } = require('jsonschema');

const NewGameModal = ({ setOpen }) => {
  const [title, setTitle] = React.useState('');
  const [titleError, setTitleError] = React.useState('');
  const [errorToggle, setErrorToggle] = React.useState(false);
  const [file, setFile] = React.useState({});
  const [invalidFile, setInvalidFile] = React.useState(false);
  const history = useHistory();
  const context = React.useContext(StoreContext);
  const { edit: [, setEdit] } = context;
  const { quiz: [, setQuiz] } = context;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title === '') {
      setErrorToggle(true);
      setTitleError('Please enter a name');
    } else {
      const res = await api.post('admin/quiz/new', { headers: { 'content-type': 'application/json', Authorization: getToken() }, body: JSON.stringify({ name: title }) });
      if (res.quizId) {
        setOpen(false);
        setQuiz(res.quizId);
        setEdit({
          id: 0, points: 10, time: 30, qType: 'single', answers: [], preview: 5,
        });
        history.push(`/edit/${res.quizId}`);
      } else {
        // handle errors
      }
    }
  };
  const classes = useStyles();

  const upload = () => {
    document.getElementById('imgupload').click();
  };
  const parseJSON = async () => {
    if (file.name === '') {
      setErrorToggle(true);
      setTitleError('JSON file does not have a name for the quiz');
    } else {
      await api.post('admin/quiz/new', {
        headers: {
          'content-type': 'application/json',
          Authorization: getToken(),
        },
        body: JSON.stringify({ name: file.name }),
      });
    }
  };

  const quiz = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      questions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            media: {
              type: 'object',
              properties: {
                type: 'string',
              },
              required: ['type'],
            },
            points: { type: 'number' },
            preview: { type: 'number' },
            qType: { type: 'string' },
            question: { type: 'string' },
            time: { type: 'number' },
            answers: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  answer: { type: 'string' },
                  correct: { type: 'boolean' },
                },
                required: ['id', 'answer', 'correct'],
              },
            },
          },
          required: ['id', 'question', 'media', 'points', 'preview', 'qType', 'time', 'answers'],
        },
      },
    },
    required: ['name', 'questions'],
  };
  // };

  const validJSON = () => {
    const v = new Validator();

    const res = v.validate(file, quiz, { required: true });

    return res.valid
      ? parseJSON(file) : setInvalidFile(true);
  };

  const handleChange = (event) => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], 'UTF-8');
    fileReader.onload = (e) => {
      const res = JSON.parse(e.target.result);
      setFile(res);
    };
    validJSON();
  };

  const handleClose = () => {
    setInvalidFile(false);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Container maxWidth="xs">
        <Paper>
          <ModalGrid container spacing={3}>
            <Grid item>
              <Typography id="title" variant="h4">Create a Quiz!</Typography>
            </Grid>
            <Divider />
            <form onSubmit={(event) => handleSubmit(event)}>
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <FormControl
                    variant="filled"
                    error={errorToggle}
                    fullWidth
                  >
                    <InputLabel htmlFor="quiz-title">Give your quiz a name!</InputLabel>
                    <Input
                      id="quiz-title"
                      placeholder="Name"
                      onBlur={(event) => setTitle(event.target.value)}
                    />
                    {titleError}
                  </FormControl>
                </Grid>
                <Grid item>
                  <Button
                    fullWidth
                    id="submit"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Confirm

                  </Button>
                </Grid>
                <Typography>
                  Wondering where to add your questions?
                  Don&apos;t worry, once you press confirm it&apos;ll
                  direct you to a page where you can get going!
                </Typography>
                <input type="file" accept=".json" id="imgupload" className={classes.upload} onChange={handleChange} />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={upload}
                >
                  Upload a JSON file for your questions
                </Button>

              </Grid>
            </form>
          </ModalGrid>
        </Paper>
      </Container>
      <Snackbar open={invalidFile} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          This file is an invalid JSON file.
        </Alert>
      </Snackbar>
    </Grid>
  );
};

NewGameModal.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default NewGameModal;
