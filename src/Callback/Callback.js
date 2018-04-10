import React, { Component } from 'react';
import history from '../history';

class Callback extends Component {
  render() {
    const hash = this.props.location.hash;

    this.props.auth.setSession(hash);
    history.replace('/home');

    return (
      <div>
        callback
      </div>
    );
  }
}

export default Callback;
