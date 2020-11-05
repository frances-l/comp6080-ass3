import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Container, TextField } from '@material-ui/core/';
import API from '../utils/api';

const api = new API('http://localhost:5005');

function Register() {
  function checkValidEmail(input) {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input);
  }

  const [inputName, setName] = React.useState('');
  const [inputEmail, setEmail] = React.useState('');
  const [inputPassword, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [validUser, setValidUser] = React.useState(false);
  const history = useHistory();

  const registerUser = async () => {
    // check if the shit user passed in is valid bruh
    if (inputPassword !== confirmPassword || !checkValidEmail(inputEmail)) {
      setValidUser(false);
    } else {
      setValidUser(true);
    }

    if (inputName && inputEmail && inputPassword && validUser
        && checkValidEmail(inputEmail)) {
      const options = {
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email: inputEmail, password: inputPassword, name: inputName }),
      };
      const res = await api.post('admin/auth/register', options);
      if (res.token) {
        localStorage.setItem('user_token', res.token);
        history.push('/login');
      } else {
        // register is trash
      }
    }
  };

  return (
    <main>
      <Container>
        <h1>Register Cunts</h1>
        <form>
          <TextField label="Name*" variant="outlined" name="name" id="name" onChange={(event) => setName(event.target.value)} />
          <TextField label="Email*" variant="outlined" name="email" id="email" onChange={(event) => setEmail(event.target.value)} />
          <TextField label="Password" variant="outlined" name="password" type="password" id="password" onChange={(event) => setPassword(event.target.value)} />
          <TextField label="Confirm Password*" variant="outlined" name="confirm-password" type="password" id="confirm-password" onChange={(event) => setConfirmPassword(event.target.value)} />
          <Button onClick={() => registerUser()} variant="contained">Register</Button>
          <Link to="/login">If you already have an account click hereeeeeeeee</Link>
        </form>
      </Container>
    </main>
  );
}

export default Register;
