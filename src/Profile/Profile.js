import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import axios from "axios/index";
import moment from 'moment';
import history from '../history';

class Profile extends Component {

  getFitProfile() {
    console.log('fetching profile');
    if (localStorage.getItem('access_token') && localStorage.getItem('expires_at')) {
      console.log('token found');
      const accessToken = localStorage.getItem('access_token');
      const expiresAt = moment.unix(
        parseInt(localStorage.getItem('expires_at'))
      );

      // check if token has expired
      if (moment().isAfter(expiresAt)) {
          console.log('token has expired, fetch a new one', expiresAt);
          history.replace('/ping');
      } else {
        console.log('token is good until: ', expiresAt.format());
      }

      const headers = {'Authorization': `Bearer ${accessToken}`};

      axios.get('https://api.fitbit.com/1/user/2C4GFG/profile.json', { headers })
        .then(response => {
          this.setProfile(response.data.user);
        })
        .catch(error => {
            this.setState({message: error.message});
            console.log(error);
          }
        );
    } else {
      console.log('nothing found, need to connect');
      history.replace('/ping');
    }
  }

  setProfile(user) {
    this.setState({ profile: user});
  }

  componentWillMount() {
    this.setState({profile: ''});
    this.getFitProfile();
  }

  render() {
    const { profile } = this.state;

    return (
      <div className="container">
        <div className="profile-area">
          <h1>{profile.name}</h1>
          <Panel  header="Profile">
            <img src={profile.avatar150} alt="profile" />
            <div>
              <ControlLabel><Glyphicon glyph="user"/> Nickname</ControlLabel>
              <h3>{profile.displayName}</h3>
              <p>Avg Daily Steps: { profile.averageDailySteps }</p>
            </div>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Profile;