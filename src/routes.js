import React from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import App from './App';
import Home from './Home/Home';
import Callback from './Callback/Callback';
import Profile from './Profile/Profile';
import Activity from './Activity/Activity';
import Weight from './Activity/Weight';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route path="/" render={(props) => <App auth={auth} {...props} />} />
        <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
        <Route path="/profile" render={(props) => {
          return <Profile auth={auth} {...props} />
        }} />
        <Route path="/callback" render={(props) => {
          return <Callback auth={auth} {...props} />
        }}/>
        <Route path="/activity" render={(props) => <Activity auth={auth} {...props} />}/>
        <Route path="/weight" render={(props) => <Weight auth={auth} {...props} />}/>
      </div>
    </Router>
  );
}
