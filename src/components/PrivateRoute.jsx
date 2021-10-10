import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';

const PrivateRoute = ({ path, children }) => {
  const { user } = useAuth();

  return (
    <Route
      path={path}
      render={({ location }) => (
        user
          ? children
          : <Redirect to={{ pathname: routes.loginPagePath(), state: { from: location } }} />)}
    />
  );
};

export default PrivateRoute;
