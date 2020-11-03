import React from 'react';
import './App.css';
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (<div></div>);
  return (
    <div>
      <Link to={`admin/auth/login`}> Login Page</Link>

      <Switch>
        <Route path={`admin/auth/login`}>
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
