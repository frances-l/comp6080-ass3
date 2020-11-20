import React from 'react';
import {
  AppBar, Typography, Button, makeStyles, Modal, IconButton, Grid,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
// import Popup from './Popup';
import NewGameModal from '../components/NewGameModal';
import logo from '../assets/BBlogo.png';

const useStyles = makeStyles((theme) => ({
  navBar: {
    display: 'flex',
    flexDirection: 'row',
    maxHeight: '10vh',
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
      <AppBar className={classes.navBar} key="nav-bar">
        <Grid container direction="row" alignItems="center" spacing={5}>
          {/* Probably change this logo to a svg so its not dooky quality */}
          <Grid item>
            <IconButton onClick={redirectToDashBoard}>
              <img src={logo} alt="BB-logo" className={classes.image} />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h4">BigBrain</Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleNewGameClick}>Create Quiz</Button>
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
            <Button onClick={handleJoin}>Join Game</Button>
          </Grid>
          <Grid item>
            <Button onClick={handleLogout}>Logout</Button>
          </Grid>
        </Grid>
      </AppBar>
    </header>
  );
};

export default NavBar;
