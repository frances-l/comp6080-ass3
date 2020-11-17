import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import NavBar from '../UIComponents/NavBar';
import { getToken } from '../utils/helpers';

function Homepage() {
  console.log(getToken());

  const history = useHistory();

  function register() {
    history.push('/register');
  }

  function signIn() {
    history.push('/login');
  }
  return (
    <div>
      <NavBar />
      <main>

        <Typography variant="h1">Welcome to bIgBrAiN</Typography>
        <Typography variant="h3">
          We are an innovative lightweight quiz platform for millenials that will
          revolutionise the secondary and tertiary education market for years. We are
          also the sickest of cunts

        </Typography>
        <Button onClick={() => { register(); }} variant="contained">Register</Button>
        <Button onClick={() => { signIn(); }} variant="contained">Sign In</Button>
      </main>
    </div>

  );
}

export default Homepage;
