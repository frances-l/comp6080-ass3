import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Button, Container, TextField, Typography, makeStyles,
} from '@material-ui/core/';
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
  // const [confirmPassword, setConfirmPassword] = React.useState('');
  // const [validUser, setValidUser] = React.useState('');
  const history = useHistory();

  const useStyles = makeStyles(() => ({
    regForm: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
      history.push('/login');
      console.log('registered');
      // handle this shit
    } else {
      console.log('hellooooooo');
      // register is trash
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (inputName && inputEmail && inputPassword) {
      console.log('here');
      registerUser();
    }
  };

  const classes = useStyles();

  return (
    <main>
      <Container>
        <div className={classes.regForm}>
          <Typography variant="h1">Register</Typography>
          <form onSubmit={(event) => handleClick(event)}>
            <TextField label="Name*" variant="outlined" name="name" id="name" onChange={(event) => setName(event.target.value)} />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <TextField label="Email*" variant="outlined" name="email" id="email" onChange={(event) => setEmail(event.target.value)} />
            <TextField label="Password*" variant="outlined" name="password" type="password" id="password" onChange={(event) => setPassword(event.target.value)} />
            {/* <TextField label="Confirm Password*" variant="outlined"
            name="confirm-password" type="password" id="confirm-password"
            onChange={(event) => setConfirmPassword(event.target.value)} /> */}
            <Button type="onSubmit" variant="contained">Register</Button>
            <Link to="/login">If you already have an account click hereeeeeeeee</Link>
          </form>
        </div>
      </Container>
    </main>
  );
}

export default Register;
