import React from 'react';
import {
  Link,
} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const BACKEND_URL = 'http://localhost:5005/';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function fetchLogin() {
    if (email && password) {
      const res = await fetch(`${BACKEND_URL}admin/auth/login`);
      const responseJson = await res.json();
      console.log(responseJson);
    }
  }

  return (
    <main>
      <Container>
        <h1>Sign In Bitch</h1>
        <form>
          <TextField label="Email*" varient="outlined" name="email" id="email" onChange={(event) => setEmail(event.target.value)} />
          <TextField label="Password*" varient="outlined" type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)} />
          <Button onClick={fetchLogin()} variant="contained">Sign In</Button>
          <Link to="/register">Wanna participate in the best fucking game in the world? Register here</Link>
        </form>
      </Container>
    </main>
  );
}

export default Login;
