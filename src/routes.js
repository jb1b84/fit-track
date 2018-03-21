import React from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import App from './App';
import Home from './Home/Home';
import Callback from './Callback/Callback';
import Profile from './Profile/Profile';
import Charts from './Charts/Charts';
import Activity from './Activity/Activity';
import history from './history';

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    //auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route path="/" render={(props) => <App {...props} />} />
        <Route path="/home" render={(props) => <Home {...props} />} />
        <Route path="/profile" render={(props) => {
          return <Profile {...props} />
        }} />
        <Route path="/callback" render={(props) => {
          return <Callback {...props} />
        }}/>
        <Route path="/charts" render={(props) => <Charts {...props} />} />
        <Route path="/activity" render={(props) => <Activity {...props} />}/>
      </div>
    </Router>
  );
}
