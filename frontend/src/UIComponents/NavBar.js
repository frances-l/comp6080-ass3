import React from 'react';
import {
  AppBar, Paper, Typography, Button, makeStyles, Modal, TextField,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import NewGameModal from './NewGameModal';
// import Popup from './Popup';

const NavBar = () => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const useStyles = makeStyles(() => ({
    navBar: {
      display: 'flex',
      flexDirection: 'row',
    },
  }));

  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');
  };

  const handleNewGameClick = () => {
    setOpen(true);
  };

  const handleNewGameClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <header>
      <AppBar className={classes.navBar} key="nav-bar">
        <Typography variant="h4">BigBrain</Typography>
        <Button onClick={handleNewGameClick}>Create Quiz</Button>
        <Modal
          open={open}
          onClose={handleNewGameClose}
          aria-labelledby="new-game"
          aria-describedby="new-game-popup"
        >
          <NewGameModal />
        </Modal>
        <Button>Join Game</Button>
        <Paper>
          <TextField variant="outlined" label="Enter Game ID" />
        </Paper>
        <Button onClick={handleLogout}>Logout</Button>
      </AppBar>
    </header>
  );
};

export default NavBar;
