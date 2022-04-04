import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './pages/Home/Home';
import SpotInfo from './pages/SpotInfo/SpotInfo';
import UpdateSpotInfo from './pages/UpdateSpotInfo/UpdateSpotInfo';

import './App.css';
import CheckReviews from './pages/CheckReviews/CheckReviews';
import CreateReview from './pages/CreateReview/CreateReview';
import ViewReviews from './pages/ViewReviews/ViewReviews';
import UpdateSpotFactors from './pages/UpdateSpotFactors/UpdateSpotFactors';

import CreateSpot from './pages/CreateSpot/CreateSpot';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Profile from './pages/Authentication/Profile';

function App() {
  return (
    <div className="root">
      <div className="content">
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact={true} path={'/'}>
              <Home />
            </Route>

            <Route exact={true} path={'/spots/:spotID'}>
              <SpotInfo />
            </Route>

            <Route exact={true} path={'/CheckReviews'}>
              <CheckReviews />
            </Route>

            <Route exact={true} path={'/viewreviews/:spotID'}>
              <ViewReviews />
            </Route>

            <Route exact={true} path={'/createreview/:spotID'}>
              <CreateReview />
            </Route>

            <Route exact={true} path={'/createspot'}>
              <CreateSpot />
            </Route>

            <Route exact={true} path={'/updatespotinfo'}>
              <UpdateSpotInfo />
            </Route>

            <Route exact={true} path={'/updatespotfactors/:spotID'}>
              <UpdateSpotFactors />
            </Route>

            <ProtectedRoute path="/profile" component={Profile} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
