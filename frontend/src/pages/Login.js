import React from 'react';
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

const BACKEND_URL = "http://localhost:5005/";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function fetchLogin() {
    if (email && password) {
      const res = await fetch(`${BACKEND_URL}admin/auth/login`);
      const response_json = await res.json();
      console.log(response_json);
    }
  }

  return (
    <section>
      <h2>Login the fucken page</h2>
      <div name="login-container">
        <form name="login-form">
          <input
            type="text"
            placeholder="ENTER YOUR FUCKEN EMAIL BITCH"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
          ></input>
          <input
            type="text"
            placeholder="ENTER YOUR FUCKEN PASSWORD BITCH"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </form>
        <button name="login" onClick={fetchLogin()}>
          Login
        </button>
        <span>
          {" "}
          If you don't have an account,
          <Link to={`/register`}>Register here</Link>
        </span>

        {/* So for each link we add, we need to include the Route in the switch tag, and the tag of the page we want to render */}
        <Switch>
          <Route path={"/register"}>
            <Register />
          </Route>
        </Switch>
      </div>
    </section>
  );
}

export default Login;
