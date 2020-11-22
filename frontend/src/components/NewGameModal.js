import React from 'react';
import {
  Typography, Button, InputLabel, Input,
  Container, FormControl, Paper, Grid, Divider, styled,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getToken } from '../utils/helpers';
import API from '../utils/api';
import { StoreContext } from '../utils/store';

const api = new API('http://localhost:5005');

const ModalGrid = styled(Grid)({
  padding: '2em',
});

const NewGameModal = ({ setOpen }) => {
  const [title, setTitle] = React.useState('');
  const [titleError, setTitleError] = React.useState('');
  const [errorToggle, setErrorToggle] = React.useState(false);
  const history = useHistory();
  const context = React.useContext(StoreContext);
  const { edit: [, setEdit] } = context;
  const { quiz: [, setQuiz] } = context;

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(title);
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
        console.log(`Setting quiz to ${res}`);
        history.push(`/edit/${res.quizId}`);
      } else {
        // handle errors
      }
    }
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
              </Grid>
            </form>
          </ModalGrid>
        </Paper>
      </Container>
    </Grid>
  );
};

NewGameModal.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default NewGameModal;
