import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import ChatPage from './ChatPage.jsx';
import routes from '../routes';
import Navbar from './Navbar.jsx';

const App = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <Navbar />
      <Switch>
        <Route path={routes.loginPagePath()}>
          <LoginPage />
        </Route>
        <Route path={routes.homePagePath()} exact>
          <ChatPage />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
