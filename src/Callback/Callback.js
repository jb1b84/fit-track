import React, { Component } from 'react';
import history from '../history';

class Callback extends Component {

  componentWillMount() {
    const hash = this.props.location.hash;

    this.props.auth.setSession(hash);
    history.replace('/home');
  }
  render() {
    return (
      <div>
        callback
      </div>
    );
  }
}

export default Callback;
