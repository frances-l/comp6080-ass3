import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import NavBar from '../components/NavBar';
import API from '../utils/api';
import { getToken } from '../utils/helpers';
// import { StoreContext } from '../utils/store';

const api = new API('http://localhost:5005');
const Results = (props) => {
  const { match: { params } } = props;

  console.log(params.sid);
  (async () => {
    // await api.post(`admin/quiz/${quiz}/end`, { headers: { Authorization: getToken() } });
    const res = await api.get(`admin/session/${params.sid}/results`, { headers: { Authorization: getToken() } });
    console.log(res);
  })();

  //   const res = api;
  return (
    <header>
      <NavBar />
      <Typography variant="h1">Results!</Typography>
    </header>

  );
};

Results.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Results;
