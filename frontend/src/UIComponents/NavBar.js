import React from 'react';
import {
  AppBar, Typography, Button, makeStyles, Modal, IconButton,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
// import Popup from './Popup';
import NewGameModal from '../components/NewGameModal';
import logo from '../assets/BBLogo.jpg';

const useStyles = makeStyles((theme) => ({
  navBar: {
    display: 'flex',
    flexDirection: 'row',
    maxHeight: '10vh',
    ...theme.mixins.toolbar,
  },
  image: {
    height: '10vh',
    width: '10vw',
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
        {/* Probably change this logo to a svg so its not dooky quality */}
        <IconButton onClick={redirectToDashBoard}>
          <img src={logo} alt="BB-logo" className={classes.image} />
        </IconButton>
        <Typography variant="h4">BigBrain</Typography>
        <Button onClick={handleNewGameClick}>Create Quiz</Button>
        <Modal
          open={open}
          onClose={handleNewGameClose}
          aria-labelledby="new-game"
          aria-describedby="new-game-popup"
        >
          <NewGameModal setOpen={setOpen} />
        </Modal>
        <Button onClick={handleJoin}>Join Game</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </AppBar>
    </header>
  );
};

export default NavBar;
