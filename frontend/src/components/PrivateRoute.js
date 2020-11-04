/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import isLogin from '../utils';

// im gonna add some comments so i remember whats going on
// component refers to which component ie Login, Register, etc.
// dude eslint is so cancer :(
const PrivateRoute = ({ component: Component, ...rest }) => (

  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signin page
  <Route
    {...rest}
    render={(props) => (
      isLogin()
        ? <Component {...props} />
        : <Redirect to="/login" />
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
