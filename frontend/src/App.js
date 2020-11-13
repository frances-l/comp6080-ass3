// import logo from './logo.svg';
import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Switch,
} from 'react-router-dom';
import routes from './routes';
import StoreProvider from './utils/store';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter key="routes">
        <Switch>{routes}</Switch>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
