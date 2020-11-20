import React from 'react';
import {
  AppBar, Typography, Button, makeStyles, Modal, IconButton, Grid, Paper,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
// import Popup from './Popup';
import NewGameModal from '../components/NewGameModal';
import logo from '../assets/BBlogo.png';
import '../styles/styles.css';

const useStyles = makeStyles((theme) => ({
  navBar: {
    display: 'flex',
    flexDirection: 'row',
    maxHeight: '5vh',
    ...theme.mixins.toolbar,
  },
  image: {
    maxHeight: '5vh',
  },
}));

const NavBar = () => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');
  };

  const redirectToDashBoard = () => {
    history.push('/');
  };

  const handleNewGameClick = () => {
    setOpen(true);
  };

  const handleNewGameClose = () => {
    setOpen(false);
  };

  const handleJoin = () => {
    history.push('/join');
  };

  const classes = useStyles();

  return (
    <header>
      <Paper>
        <AppBar className={classes.navBar} key="nav-bar" color="inherit">
          <Grid container direction="row" alignItems="center" justify="space-between">
            <Grid container item direction="row" xs={4}>
              <Grid item>
                <IconButton onClick={redirectToDashBoard}>
                  <img src={logo} alt="BB-logo" className={classes.image} />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="h4">BigBrain</Typography>
              </Grid>
            </Grid>
            <Grid container item xs={6} spacing={3}>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleNewGameClick}>Create Quiz</Button>
              </Grid>
              <Modal
                open={open}
                onClose={handleNewGameClose}
                aria-labelledby="new-game"
                aria-describedby="new-game-popup"
              >
                <NewGameModal setOpen={setOpen} />
              </Modal>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleJoin}>Join Game</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
              </Grid>
            </Grid>
          </Grid>
        </AppBar>
      </Paper>
    </header>
  );
};

export default NavBar;
