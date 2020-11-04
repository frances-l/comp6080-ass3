/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import isLogin from '../utils';

const PublicRoute = ({ component: Component, restricted, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      isLogin() && restricted
        ? <Redirect to="/dashboard" />
        : <Component {...props} />
    )}
  />
);

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  restricted: PropTypes.bool.isRequired,
};

export default PublicRoute;
