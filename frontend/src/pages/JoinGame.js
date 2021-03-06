import React from 'react';
import {
  TextField, Typography, Button, Container, Grid, styled, Paper,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import API from '../utils/api';
import { StoreContext } from '../utils/store';
import { getToken } from '../utils/helpers';
import ErrorHandler from '../components/ErrorHandler';

const api = new API('http://localhost:5005');

// game id is 984485397, session is 191470
const PageLayout = styled(Container)({
  paddingTop: '10vh',

});

const BackgroundTile = styled(Paper)({
  padding: '3em',
});

function JoinGame(props) {
  const context = React.useContext(StoreContext);
  const { player: [, setPlayer] } = context;
  const { session: [, setSession] } = context;
  const [joinid, setJoinID] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const { apiError: [, setApiError] } = context;
  const [error, setError] = React.useState(false);
  const history = useHistory();
  const { match: { params } } = props;

  React.useEffect(() => {
    if (params.sid) {
      setJoinID(params.sid);
    }
  }, [params.sid]);

  const join = async () => {
    const path = `play/join/${joinid}`; // will need to change path later so it has id of session
    const options = {
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name: nickname,
      }),
    };
    const res = await api.post(path, options);
    if (res.error) {
      setApiError({ error: true, message: res.error });
    }
    // depending on result from this api call we can determine whether the player is admin or not
    if (res.playerId) {
      // let admin = -1;
      const result = await api.get(`admin/session/${joinid}/status`, { headers: { Authorization: getToken() } });
      if (result.error) {
        setPlayer({ name: nickname, id: res.playerId, isAdmin: false });
      } else {
        setPlayer({ name: nickname, id: res.playerId, isAdmin: true });
      }
      setSession(result);
      history.push(`/play/${joinid}`);
    } else {
      setError(true);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (joinid && nickname) {
      join();
    }
  };

  return (
    <main>
      <header>
        <NavBar />
      </header>
      <section>
        <PageLayout maxWidth="sm">
          <BackgroundTile>
            <Grid container direction="column" spacing={5}>
              <Typography color="textPrimary" variant="h2">Join a game!</Typography>
              <form onSubmit={(event) => handleClick(event)}>
                <Grid container item spacing={2}>
                  <Grid container item spacing={2}>
                    <Grid item>
                      <TextField
                        error={error}
                        helperText={error ? 'This Session doesnt exist' : ''}
                        label="ID of the quiz session*"
                        variant="outlined"
                        name="joinid"
                        id="joinid"
                        onChange={(event) => setJoinID(event.target.value)}
                        value={joinid}
                      />
                    </Grid>
                    <Grid item>
                      <TextField label="Nickname for the quiz*" variant="outlined" name="nickname" id="nickname" onChange={(event) => setNickname(event.target.value)} />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button type="onSubmit" color="primary" variant="contained">Join game!</Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </BackgroundTile>
        </PageLayout>
        <ErrorHandler />
      </section>
    </main>
  );
}

JoinGame.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
};

JoinGame.defaultProps = {
  match: 0,
};

export default JoinGame;
