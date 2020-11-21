import React from 'react';
import {
  AppBar, Typography, Button, makeStyles, Modal, IconButton, Grid, Paper, useMediaQuery, useTheme,
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
    [theme.breakpoints.down('sm')]: {
      maxHeight: '8vh',
    },
    ...theme.mixins.toolbar,
  },
  image: {
    maxHeight: '5vh',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '7vh',
    },
  },
  createModal: {
    paddingTop: '30vh',
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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <header>
      <Paper>
        <AppBar className={classes.navBar} key="nav-bar" color="inherit">
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-around"
          >
            <Grid container item direction="row" xs={matches ? 1 : 4}>
              <Grid item>
                <IconButton id="redirect-dashboard" onClick={redirectToDashBoard}>
                  <img src={logo} alt="BB-logo" className={classes.image} />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="h4">{matches ? '' : 'BigBrain'}</Typography>
              </Grid>
            </Grid>
            <Grid
              className={classes.navButtonGroup}
              container
              item
              xs={matches ? 10 : 8}
              spacing={2}
              justify="flex-end"
            >
              <Grid item>
                <Button id="create-quiz" variant="contained" color="primary" onClick={handleNewGameClick}>{matches ? 'Create' : 'Create Quiz'}</Button>
              </Grid>
              <Modal
                className={classes.createModal}
                open={open}
                onClose={handleNewGameClose}
                aria-labelledby="new-game"
                aria-describedby="new-game-popup"
              >
                <NewGameModal setOpen={setOpen} />
              </Modal>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleJoin}>{matches ? 'Join' : 'join Game'}</Button>
              </Grid>
              <Grid item>
                <Button id="logout" variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
              </Grid>
            </Grid>
          </Grid>
        </AppBar>
      </Paper>
    </header>
  );
};

export default NavBar;
