import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './pages/Home/Home';
import Rooms from './pages/Rooms/Rooms';
import Users from './pages/Users/Users';

import './App.css';
import CheckReviews from './pages/CheckReviews/CheckReviews';

function App() {
  return (
    <div className="root">
      <div className="content">
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact={true} path={'/'}>
              <Home />
            </Route>
            <Route exact={true} path={'/rooms'}>
              <Rooms />
            </Route>
            <Route exact={true} path={'/users'}>
              <Users />
            </Route>
            <Route exact={true} path={'/CheckReviews'}>
              <CheckReviews />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
