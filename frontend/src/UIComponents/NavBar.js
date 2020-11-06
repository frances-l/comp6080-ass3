import React from 'react';
import {
  AppBar, Typography, Button, Popper, makeStyles, MenuList, MenuItem, IconButton, Paper,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';

const NavBar = () => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const toggleMenu = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setMenuOpen(true);
  };

  const open = Boolean(anchorEl);

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

  const classes = useStyles();

  return (
    <header>
      <AppBar className={classes.navBar} key="nav-bar">
        <IconButton onClick={(event) => toggleMenu(event)}>
          <MenuIcon />
        </IconButton>
        <Popper open={open} anchorEl={anchorEl} disablePortal>
          <Paper>
            <MenuList autoFocusItem={menuOpen}>
              <MenuItem key="1">New Game</MenuItem>
              <MenuItem key="2">Join Game</MenuItem>
            </MenuList>
          </Paper>
        </Popper>
        <Typography variant="h4">BigBrain</Typography>
        <Button onClick={handleLogout}>Logout</Button>
        {/* <Button onClick={(event) => toggleMenu(event)}>clickme</Button> */}
      </AppBar>
    </header>
  );
};

export default NavBar;
