import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './pages/Home/Home';
import SpotInfo from './pages/SpotInfo/SpotInfo';
import UpdateSpotInfo from './pages/UpdateSpotInfo/UpdateSpotInfo';

import './App.css';
import CreateReview from './pages/CreateReview/CreateReview';
import ViewReviews from './pages/ViewReviews/ViewReviews';
import UpdateSpotFactors from './pages/UpdateSpotFactors/UpdateSpotFactors';

import CreateSpot from './pages/CreateSpot/CreateSpot';

import SubmissionSuccess from './pages/SubmissionSuccess/SubmissionSuccess';

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

            <Route exact={true} path={'/spot_review/read/:spotID'}>
              <ViewReviews />
            </Route>

            <Route exact={true} path={'/createreview/:spotID'}>
              <CreateReview />
            </Route>

            {/* <Route exact={true} path={'/createspot'}>
              <CreateSpot />
            </Route> */}
            <ProtectedRoute path="/createspot" component={CreateSpot} />

            <Route exact={true} path={'/updatespotinfo/:spotID'}>
              <UpdateSpotInfo />
            </Route>

            <Route exact={true} path={'/updatespotfactors/:spotID'}>
              <UpdateSpotFactors />
            </Route>

            <Route exact={true} path={'/submissionsuccess'}>
              <SubmissionSuccess />
            </Route>

            <ProtectedRoute path="/profile" component={Profile} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
