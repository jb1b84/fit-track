import React, { Component } from 'react';
import axios from 'axios/index';

class Activity extends Component {
  componentWillMount() {
    this.setState({activity: ''});
    this.getActivity();
  }

  getActivity() {
    if (localStorage.getItem('access_token')) {
      const accessToken = localStorage.getItem('access_token');
      const headers = {'Authorization': `Bearer ${accessToken}`};

      const date = '2018-3-19';
      const uri = `https://api.fitbit.com/1/user/2C4GFG/activities/date/${date}.json`;
      axios.get(uri, { headers})
        .then(response => {
          this.setState({activity: response.data.summary});
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    const { activity } = this.state;

    return (
      <div className="container">
        Activity area
        <pre>{JSON.stringify(activity, null, 2)}</pre>
      </div>
    )
  }
}

export default Activity;
