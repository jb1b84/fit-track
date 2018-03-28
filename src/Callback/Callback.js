import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class Callback extends Component {
  render() {
    const hash = this.props.location.hash;
    const queryString = require('query-string');
    const parsedHash = queryString.parse(this.props.location.hash);

    localStorage.setItem('access_token', parsedHash.access_token);
    localStorage.setItem('user_id', parsedHash.user_id);
    localStorage.setItem('expires_at', moment().add(parsedHash.expires_in).unix());

    let expire = parsedHash.expires_in;
    console.log('expire', expire);

    return (
      <div>
        callback
      </div>
    );
  }
}

export default Callback;
