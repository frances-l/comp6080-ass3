import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../UIComponents/NavBar';
import API from '../utils/api';
import { getToken } from '../utils/helpers';

const api = new API('http://localhost:5005');
const Results = (props) => {
  const { match: { params } } = props;

  console.log(params.sid);
  (async () => {
    const res = await api.get(`admin/session/${params.sid}/results`, { headers: { Authorization: getToken() } });
    console.log(res);
  })();

  //   const res = api;
  return (
    <header>
      <NavBar />
    </header>

  );
};

Results.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Results;
