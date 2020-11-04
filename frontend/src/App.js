// import logo from './logo.svg';
import './App.css';
import React from 'react';
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

function App() {
  return (
    <div>
      <Link to="admin/auth/login"> Login Page</Link>

      <Switch>
        <Route path="admin/auth/login" />
      </Switch>
    </div>
  );
}

export default App;
