import React from 'react';
import {
  Link,
  // Redirect,
  useHistory,
} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import API from '../utils/api';

const api = new API('http://localhost:5005');

function Login() {
  const [userEmail, setEmail] = React.useState('');
  const [userPassword, setPassword] = React.useState('');
  const history = useHistory();
  // const [error, setError] = React.useState(false);
  function fetchLogin() {
    if (userEmail && userPassword) {
      api.post('admin/auth/login', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'hayden@unsw.edu.au',
          password: 'adummypassword',
        }),
      })
        .then((res) => {
          if (res.token) {
            localStorage.setItem('user_token', res.token);
            history.push('/homepage');
          } else {
            // shits fucked
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <main>
      <Container>
        <h1>Sign In Bitch</h1>
        <form>
          <TextField label="Email*" variant="outlined" name="email" id="email" onChange={(event) => setEmail(event.target.value)} />
          <TextField label="Password*" variant="outlined" type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)} />
          <Button onClick={() => fetchLogin()} variant="contained">Sign In</Button>
          <Link to="/register">Wanna participate in the best fucking game in the world? Register here</Link>
        </form>
      </Container>
    </main>
  );
}

export default Login;
