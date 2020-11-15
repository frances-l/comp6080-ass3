import React from 'react';
import { TextField, Typography, Button } from '@material-ui/core';
import NavBar from '../UIComponents/NavBar';
import API from '../utils/api';

const api = new API('http://localhost:5005');

// game id is 984485397, session is 191470

function JoinGame() {
  const [joinid, setJoinID] = React.useState('');
  const [nickname, setNickname] = React.useState('');

  const join = async () => {
    console.log(nickname);
    const path = 'play/join/191470'; // will need to change path later so it has id of session
    const options = {
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name: nickname,
      }),
    };
    const res = await api.post(path, options);
    console.log(res);
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
        <Typography variant="h2">Join a game!</Typography>
        <form onSubmit={(event) => handleClick(event)}>
          <TextField label="ID of the quiz session*" variant="outlined" name="joinid" id="joinid" onChange={(event) => setJoinID(event.target.value)} />
          <TextField label="Nickname for the quiz*" variant="outlined" name="nickname" id="nickname" onChange={(event) => setNickname(event.target.value)} />
          <Button type="onSubmit" variant="contained">Join game!</Button>
        </form>
      </section>
    </main>
  );
}

export default JoinGame;
