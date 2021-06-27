import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import ChatPage from './ChatPage.jsx';
import routes from '../routes';
import Header from './Header.jsx';
import AuthProvider from './AuthProvider.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import RegistrationPage from './RegistrationPage.jsx';

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <Header />
        <Switch>
          <Route path={routes.loginPagePath()}>
            <LoginPage />
          </Route>
          <Route path={routes.signupPagePath()}>
            <RegistrationPage />
          </Route>
          <PrivateRoute path={routes.chatPagePath()} exact>
            <ChatPage />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
