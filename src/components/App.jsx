import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Navbar from './Navbar.jsx';
import AuthProvider from './AuthProvider.jsx';
import LoginPage from './LoginPage.jsx';
import ChatPage from './ChatPage.jsx';
import RegistrationPage from './Registration.jsx';
import PrivateRoute from './PrivateRoute.jsx';

import routes from '../routes.js';

const App = () => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path={routes.loginPagePath()}>
            <LoginPage />
          </Route>
          <Route exact path={routes.signUpPagePath()}>
            <RegistrationPage />
          </Route>
          <PrivateRoute exact path={routes.chatPagePath()}>
            <ChatPage />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  </AuthProvider>
);
export default App;
