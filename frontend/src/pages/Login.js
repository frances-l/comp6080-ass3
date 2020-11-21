import React from 'react';
import {
  Link,
  useHistory,
} from 'react-router-dom';
import {
  makeStyles, Grid, TextField, Button, Typography,
} from '@material-ui/core';
import API from '../utils/api';

const api = new API('http://localhost:5005');

const useStyles = makeStyles({
  formContainer: {
    paddingTop: '20vh',
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
      {/* <Container className={classes.formContainer}> */}
      <Grid
        className={classes.formContainer}
        container
        direction="column"
        alignContent="center"
        spacing={3}
      >
        <Grid item>
          <Typography color="textPrimary" variant="h1">Sign In Bitch</Typography>
        </Grid>
        <form>
          <Grid container item direction="column" spacing={2}>
            <Grid item>
              <TextField fullWidth label="Email*" variant="outlined" name="email" id="email" onChange={(event) => setEmail(event.target.value)} />
            </Grid>
            <Grid item>
              <TextField fullWidth label="Password*" variant="outlined" type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)} />
            </Grid>
            <Grid item>
              <Button fullWidth id="submit" onClick={() => { fetchLogin(); }} variant="contained">Sign In</Button>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                color="primary"
                id="register"
                to="/register"
              >
                Wanna participate in the best fucking game in the world? Register here

              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      {/* </Container> */}
    </main>
  );
}

export default Login;
