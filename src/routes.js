import React from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import App from './App';
import Home from './Home/Home';
import Callback from './Callback/Callback';
import Profile from './Profile/Profile';
import Charts from './Charts/Charts';
import Activity from './Activity/Activity';
import Ping from './Ping/Ping';
import history from './history';

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
        <Route path="/ping" render={(props) => <Ping {...props} />}/>
      </div>
    </Router>
  );
}
