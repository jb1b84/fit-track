import React, { Component } from 'react';

class Home extends Component {
  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="container">
        {
          isAuthenticated() && (
            <h4>
              You are logged in !
            </h4>
          )
        }
        {
          !isAuthenticated() && (
            <h4>
              You are not logged in!{' '}
              <a
                style={{ cursor: 'pointer' }}
                onClick={this.login.bind(this)}
              >
                Log in
              </a>
              {' '}to continue
            </h4>
          )
        }
      </div>
    );
  }
}

export default Home;
