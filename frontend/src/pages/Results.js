import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import NavBar from '../UIComponents/NavBar';
import API from '../utils/api';
import { getToken, getQuizId } from '../utils/helpers';
import AppBarSpacer from '../utils/styles';

const api = new API('http://localhost:5005');
const Results = (props) => {
  const { match: { params } } = props;

  console.log(params.sid);
  (async () => {
    const qid = getQuizId(params.sid);
    console.log(qid);
    const res = await api.get(`admin/session/${params.sid}/results`, { headers: { Authorization: getToken() } });
    console.log(res);
    // const response = await api.get(`/admin/quiz/${qid}`);
    // console.log(response);
  })();

  //   const res = api;
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

        <Typography color="primary" variant="h1">Results!</Typography>
      </Grid>
    </header>

  );
};

Results.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Results;
