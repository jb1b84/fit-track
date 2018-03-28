import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { API_URL } from './../constants';
import axios from 'axios';

class Ping extends Component {
  componentWillMount() {
    this.setState({ message: '' });
  }

  ping() {
    axios.get(`${API_URL}/public`)
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }

  securedPing() {
    console.log(this.props.auth);
    const { getAccessToken } = this.props.auth;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}` };


    axios.get('https://api.fitbit.com/1/user/2C4GFG/profile.json')
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => {
          this.setState({message: error.message});
          console.log(error);
        }
      );
  }

  authorizeUrl() {
    console.log('redirecting');
    const redirectUri = 'http://localhost:3000/callback';
    let url  = `https://www.fitbit.com/oauth2/authorize?\
response_type=token\
&client_id=22CTXS\
&redirect_uri=${redirectUri}\
&scope=activity%20nutrition%20heartrate%20location%20profile%20settings%20sleep%20social%20weight\
&expires_in=604800`;

    window.location = url;
  }

  render() {
    const { message } = this.state;

    return (
      <div className="container">
        <h1>Make a call</h1>

            <Button bsStyle="primary" onClick={this.authorizeUrl.bind(this)}>
              Connect
            </Button>
        <h2>{ message }</h2>
      </div>
    );
  }
}

export default Ping;
