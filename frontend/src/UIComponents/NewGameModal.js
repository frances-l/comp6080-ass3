import React from 'react';
import {
  Container, Button, Typography, Input, FormControl, InputLabel, FormHelperText,
} from '@material-ui/core';

const NewGameModal = () => {
  const [title, setTitle] = React.useState('');
  const [titleError, setTitleError] = React.useState();
  const [errorToggle, setErrorToggle] = React.useState(false);

  const handleSubmit = () => {
    if (!title) {
      const errorHelper = <FormHelperText id="title-error">Title cannot be left empty fuckwit</FormHelperText>;
      setTitleError(errorHelper);
      setErrorToggle(true);
    }
  };
  return (
    <Container>
      <div>
        <Typography variant="h4">Create a Quiz</Typography>
        <form onSubmit={handleSubmit}>
          <FormControl variant="filled" error={errorToggle}>
            <InputLabel htmlFor="quiz-title">Quiz Title</InputLabel>
            <Input id="quiz-title" placeholder="Name" onBlur={(event) => setTitle(event.target.value)} />
            {titleError}
          </FormControl>
          <Button type="submit">Confirm</Button>
        </form>
      </div>
    </Container>
  );
};

export default NewGameModal;
