import React from 'react';
import {
  Typography, Button, makeStyles, InputLabel, Input, Container, FormControl,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getToken } from '../utils/helpers';
import API from '../utils/api';
import { StoreContext } from '../utils/store';

const api = new API('http://localhost:5005');

const useStyles = makeStyles(() => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
}));

const NewGameModal = ({ setOpen }) => {
  const [title, setTitle] = React.useState('');
  const [titleError, setTitleError] = React.useState('');
  const [errorToggle, setErrorToggle] = React.useState(false);
  const history = useHistory();
  const { quiz } = React.useContext(StoreContext);
  const setQuiz = quiz[1];

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
        console.log(`Setting quiz to ${res}`);
        history.push(`/edit/${res.quizId}`);
      } else {
        // handle errors
      }
    }
  };

  const classes = useStyles();
  return (
    <Container maxWidth="xs">
      <div className={classes.formContainer}>
        <Typography variant="h4">Create a Quiz!</Typography>
        <form onSubmit={(event) => handleSubmit(event)}>
          <FormControl
            variant="filled"
            error={errorToggle}
          >
            <InputLabel htmlFor="quiz-title">Give your quiz a name!</InputLabel>
            <Input id="quiz-title" placeholder="Name" onBlur={(event) => setTitle(event.target.value)} />
            {titleError}
          </FormControl>
          <Button type="submit">Confirm</Button>
          <Typography>
            Wondering where to add your questions?
            Don`&apos;`t worry, once you press confirm it`&apos;`ll;
            direct you to a page where you can get going!
          </Typography>
        </form>

      </div>
    </Container>
  );
};

NewGameModal.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default NewGameModal;
