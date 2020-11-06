import React from 'react';
import {
  AppBar, Paper, Typography, Button, makeStyles, Popover, TextField,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
// import Popup from './Popup';

const NavBar = () => {
  const history = useHistory();

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
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

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl1(null);
    setAnchorEl2(null);
  };
  const classes = useStyles();

  return (
    <header>
      <AppBar className={classes.navBar} key="nav-bar">
        <Typography variant="h4">BigBrain</Typography>
        <Button onClick={(event) => handleClick1(event)}>Create Quiz</Button>
        <Popover
          id="a"
          open={Boolean(anchorEl1)}
          anchorEl={anchorEl1}
          onClose={handleClose}
        >
          <Button>helo</Button>
          <Button>he321lo</Button>
          <Button>he213lo</Button>
          <Button>hel432o</Button>
        </Popover>
        <Button onClick={(event) => handleClick2(event)}>Join Game</Button>
        <Popover
          id="a"
          open={Boolean(anchorEl2)}
          anchorEl={anchorEl2}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Paper>
            <TextField variant="outlined" label="Enter Game ID" />
          </Paper>
        </Popover>
        <Button onClick={handleLogout}>Logout</Button>
      </AppBar>
    </header>
  );
};

export default NavBar;
