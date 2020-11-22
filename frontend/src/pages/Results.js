import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import NavBar from '../components/NavBar';
import API from '../utils/api';
import { getToken, getQuizId } from '../utils/helpers';
import AppBarSpacer from '../utils/styles';

const api = new API('http://localhost:5005');

const calculatePoints = (results, points) => {
  const players = [];
  for (let i = 0; i < results.length; i += 1) {
    const currPlayer = results[i];
    const { name } = results[i];
    let sum = 0;
    for (let j = 0; j < currPlayer.answers.length; j += 1) {
      const currQ = currPlayer.answers[j];
      if (currQ.correct === true) {
        sum += Number(points[j]);
      }
    }
    const final = { nickname: name, points: sum };
    players.push(final);
  }
  players.sort((a, b) => parseFloat(b.points) - parseFloat(a.points));
  return players;
};

const Results = (props) => {
  const { match: { params } } = props;
  const [finalResults, setFinalResults] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const qid = await getQuizId(params.sid);
      const results = await api.get(`admin/session/${params.sid}/results`, { headers: { Authorization: getToken() } });
      const response = await api.get(`admin/quiz/${qid}`, { headers: { Authorization: getToken() } });

      const points = [];
      for (let i = 0; i < response.questions.length; i += 1) {
        const curr = response.questions[i];
        points.push(curr.points);
      }
      const r = calculatePoints(results.results, points);
      setFinalResults(r);
    })();
  }, [finalResults, params.sid]);
  return (
    <header>
      <NavBar />
      <AppBarSpacer />
      <Grid
        container
        direction="column"
        alignContent="center"
        spacing={2}
      >
        <Grid item>

          <Typography color="primary" variant="h1">Results!</Typography>
        </Grid>
        {finalResults.map((player) => (
          <Grid item>
            <Typography color="primary" variant="h6">
              {player.nickname}
              {' '}
              got
              {' '}
              {player.points}
              {' '}
              points!
            </Typography>
          </Grid>
        ))}

      </Grid>
    </header>

  );
};

Results.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Results;
