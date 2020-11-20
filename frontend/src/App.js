// import logo from './logo.svg';
import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Switch,
} from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import routes from './routes';
import StoreProvider from './utils/store';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { 500: 'rgb(153,170,181)' },
  },
});

function App() {
  document.body.style = 'background: rgb(33,33,33)';
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <BrowserRouter key="routes">
          <Switch>{routes}</Switch>
        </BrowserRouter>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
