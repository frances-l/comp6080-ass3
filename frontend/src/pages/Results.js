import React from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import { Grid, Typography } from '@material-ui/core';
import NavBar from '../UIComponents/NavBar';
=======
import { Typography } from '@material-ui/core';
import NavBar from '../components/NavBar';
>>>>>>> bda443f70d7995b2ca8303873d1be8ac790327e6
import API from '../utils/api';
import { getToken, getQuizId } from '../utils/helpers';
import AppBarSpacer from '../utils/styles';

const api = new API('http://localhost:5005');
const Results = (props) => {
  const { match: { params } } = props;

  (async () => {
<<<<<<< HEAD
    const qid = getQuizId(params.sid);
    console.log(qid);
=======
>>>>>>> bda443f70d7995b2ca8303873d1be8ac790327e6
    const res = await api.get(`admin/session/${params.sid}/results`, { headers: { Authorization: getToken() } });
    console.log(res);
    // const response = await api.get(`/admin/quiz/${qid}`);
    // console.log(response);
  })();
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
