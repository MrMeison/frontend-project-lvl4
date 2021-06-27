import React from 'react';
import {
  Redirect, Route,
} from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes.js';

const PrivateRoute = ({ children, ...props }) => {
  const auth = useAuth();

  return (
    <Route
        // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      render={({ location }) => (auth.user
        ? children
        : <Redirect to={{ pathname: routes.loginPagePath(), state: { from: location } }} />)}
    />
  );
};

export default PrivateRoute;
