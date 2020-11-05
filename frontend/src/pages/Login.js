import React from 'react';
import {
  Link,
  useHistory,
} from 'react-router-dom';
import {
  makeStyles, Container, TextField, Button, Typography,
} from '@material-ui/core';
import API from '../utils/api';

const api = new API('http://localhost:5005');

const useStyles = makeStyles({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

function Login() {
  const [userEmail, setEmail] = React.useState('');
  const [userPassword, setPassword] = React.useState('');

  const history = useHistory();
  async function fetchLogin() {
    if (userEmail && userPassword) {
      api.post('admin/auth/login', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      })
        .then((res) => {
          if (res.token) {
            localStorage.setItem('user_token', res.token);
            history.push('/');
          } else {
            // shits fucked
            // console.log(`hello ${res.error}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const classes = useStyles();

  return (
    <main>
      <Container className={classes.formContainer}>
        <Typography variant="h1">Sign In Bitch</Typography>
        <form>
          <TextField label="Email*" varient="outlined" name="email" id="email" onChange={(event) => setEmail(event.target.value)} />
          <TextField label="Password*" varient="outlined" type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)} />
          <Button onClick={() => { fetchLogin(); }} variant="contained">Sign In</Button>
          <Link to="/register">Wanna participate in the best fucking game in the world? Register here</Link>
        </form>
      </Container>
    </main>
  );
}

export default Login;
