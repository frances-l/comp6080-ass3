import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Homepage from '../pages/Homepage';
import Dashboard from '../pages/Dashboard';
import PublicRoute from '../components/PublicRoute';
import PrivateRoute from '../components/PrivateRoute';
import JoinGame from '../pages/JoinGame';

const routes = [
  <PublicRoute restricted component={Login} path="/login" exact />,
  <PublicRoute restricted component={Register} path="/register" exact />,
  <PublicRoute restricted={false} component={Homepage} path="/" exact />,
  <PrivateRoute component={Dashboard} path="/dashboard" exact />,
  <PrivateRoute component={JoinGame} path="/join" exact />,
];

export default routes;
