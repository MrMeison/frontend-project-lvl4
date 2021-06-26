import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import ChatPage from './ChatPage.jsx';
import routes from '../routes';
import Navbar from './Navbar.jsx';
import AuthProvider from './AuthProvider.jsx';
import PrivateRoute from './PrivateRoute.jsx';

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <Switch>
          <Route path={routes.loginPagePath()}>
            <LoginPage />
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
