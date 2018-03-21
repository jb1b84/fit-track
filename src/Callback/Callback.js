import React, { Component } from 'react';
import axios from 'axios';

class Callback extends Component {
  render() {
    const hash = this.props.location.hash;
    const queryString = require('query-string');
    const parsedHash = queryString.parse(this.props.location.hash);
    console.log('parsed hash', parsedHash);

    localStorage.setItem('access_token', parsedHash.access_token);
    localStorage.setItem('user_id', parsedHash.user_id);

    return (
      <div>
        callback
      </div>
    );
  }
}

export default Callback;
