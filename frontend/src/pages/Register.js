import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Button, TextField, Typography, makeStyles, Grid, Snackbar,
} from '@material-ui/core/';
import { Alert } from '@material-ui/lab';
import API from '../utils/api';
// import isLogin from '../utils';

const api = new API('http://localhost:5005');

function Register() {
  // function checkValidEmail(input) {
  //   return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input);
  // }

  const [inputName, setName] = React.useState('');
  const [inputEmail, setEmail] = React.useState('');
  const [inputPassword, setPassword] = React.useState('');
  const [invalidEmail, setInvalidEmail] = React.useState(false);
  const [oldEmail, setOldEmail] = React.useState(false);
  // const [confirmPassword, setConfirmPassword] = React.useState('');
  // const [validUser, setValidUser] = React.useState('');
  const history = useHistory();

  const useStyles = makeStyles(() => ({
    regForm: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    formContainer: {
      paddingTop: '20vh',
    },
  }));

  const registerUser = async () => {
    const options = {
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email: inputEmail, password: inputPassword, name: inputName }),
    };
    const res = await api.post('admin/auth/register', options);
    console.log(res);
    if (res.token) {
      localStorage.setItem('user_token', res.token);
      history.push('/');
      console.log('registered');
      // handle this shit
    } else {
      console.log('hellooooooo');
      setOldEmail(true);
      // register is trash
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (inputName && inputEmail && inputPassword) {
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputEmail)) {
        registerUser();
      } else {
        setInvalidEmail(true);
      }
    }
  };

  const handleClose = () => {
    setOldEmail(false);
  };

  const classes = useStyles();

  return (
    <main>
      <Grid
        className={classes.formContainer}
        container
        direction="column"
        alignContent="center"
        spacing={3}
      >
        <Grid item>
          <Typography id="title" color="textPrimary" variant="h1">Register</Typography>
        </Grid>
        <form onSubmit={(event) => handleClick(event)}>
          <Grid container item direction="column" spacing={2}>
            <Grid item>
              <TextField fullWidth label="Name*" variant="outlined" name="name" id="name" onChange={(event) => setName(event.target.value)} />

            </Grid>
            <Grid item>

              <TextField error={invalidEmail} helperText={invalidEmail ? 'Email is not valid' : ''} fullWidth label="Email*" variant="outlined" name="email" id="email" onChange={(event) => setEmail(event.target.value)} />
            </Grid>
            <Grid item>
              <TextField fullWidth label="Password*" variant="outlined" name="password" type="password" id="password" onChange={(event) => setPassword(event.target.value)} />
            </Grid>
            <Grid item>
              <Button aria-label="register" fullWidth id="submit" type="onSubmit" variant="contained">Register</Button>
            </Grid>

            <Grid item>
              <Button id="login" aria-label="login" component={Link} color="primary" to="/login">If you already have an account click here to log in</Button>

            </Grid>
          </Grid>
        </form>
      </Grid>
      <Snackbar open={oldEmail} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          This email has been used before, please use another email.
        </Alert>
      </Snackbar>

      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {/* <TextField label="Confirm Password*" variant="outlined"
            name="confirm-password" type="password" id="confirm-password"
            onChange={(event) => setConfirmPassword(event.target.value)} /> */}

    </main>
  );
}

export default Register;
