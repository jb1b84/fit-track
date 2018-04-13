import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';

class Profile extends Component {

  constructor() {
    super();

    this.setProfile = this.setProfile.bind(this);
  }

  getFitProfile() {
    const endpoint = '/profile.json';
    const userId = this.props.auth.getUserId();
    const accessToken = this.props.auth.getAccessToken();

    this.props.api.makeRequest(userId, endpoint, accessToken, this.setProfile);
  }

  setProfile(userData) {
    const user = userData.user;
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