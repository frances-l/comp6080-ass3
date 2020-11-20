import React from 'react';
import {
  TextField, Typography, Button, Container, Grid, styled,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../UIComponents/NavBar';
import API from '../utils/api';
import { StoreContext } from '../utils/store';
import { getQuizId, getToken } from '../utils/helpers';

const api = new API('http://localhost:5005');

// game id is 984485397, session is 191470
const PageLayout = styled(Container)({
  paddingTop: '10vh',
});

function JoinGame(props) {
  const context = React.useContext(StoreContext);
  const { player: [, setPlayer] } = context;
  const { session: [, setSession] } = context;
  const [joinid, setJoinID] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [error, setError] = React.useState(false);
  const history = useHistory();
  const { match: { params } } = props;

  console.log(params.sid);
  React.useEffect(() => {
    if (params.sid) {
      setJoinID(params.sid);
    }
  }, [params.sid]);

  const join = async () => {
    console.log(nickname);
    const path = `play/join/${joinid}`; // will need to change path later so it has id of session
    const options = {
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name: nickname,
      }),
    };
    const res = await api.post(path, options);
    console.log(res);
    if (res.playerId) {
      setPlayer(res.playerId);
      // seeing if the session is active.
      const result = await api.get(`admin/session/${joinid}/status`, { headers: { Authorization: getToken() } });
      console.log('setting session from playJoin');
      console.log(result);
      setSession(result);
      const quizId = await getQuizId(joinid);
      if (result.results.active) {
        history.push(`/play/${quizId}/${joinid}`);
      } else {
        // print that the session isnt active.
      }
    } else {
      setError(true);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (joinid && nickname) {
      console.log('yayy');
      join();
    }
  };

  return (
    <main>
      <header>
        <NavBar />
      </header>
      <section>
        <PageLayout>
          <Grid container direction="column">
            <Typography variant="h2">Join a game!</Typography>
            <form onSubmit={(event) => handleClick(event)}>
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
              <TextField label="Nickname for the quiz*" variant="outlined" name="nickname" id="nickname" onChange={(event) => setNickname(event.target.value)} />
              <Button type="onSubmit" variant="contained">Join game!</Button>
            </form>
          </Grid>
        </PageLayout>
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
