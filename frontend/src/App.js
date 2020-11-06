// import logo from './logo.svg';
import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Switch,
} from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <BrowserRouter key="routes">
      <Switch>{routes}</Switch>
    </BrowserRouter>
  );
}

export default App;
