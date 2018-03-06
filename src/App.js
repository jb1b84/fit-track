import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const data = [
      {date: '1/1/2018', weight: 200},
      {date: '2/1/2018', weight: 180},
      {date: '3/1/2018', weight: 150}
    ];

    return (
      <div className="App">
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Auth0 - Fitbit + React</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
            {
              !isAuthenticated() && (
                <Button
                  id="qsLoginBtn"
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.login.bind(this)}
                >
                  Log In
                </Button>
              )
            }
            {
              isAuthenticated() && (
                <Button
                  id="qsLogoutBtn"
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.logout.bind(this)}
                >
                  Log Out
                </Button>
              )
            }
          </Navbar.Header>
        </Navbar>

        <header className="App-header">
          <h1 className="App-title">Fit tracking</h1>
        </header>
        <p className="App-intro">
          throw some charts and shit in here
        </p>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={data} margin={{ top: 30, right: 50, left: 0 }}>
            <Line type="monotone" dataKey="weight" stroke="#8884d8" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>


      </div>
    );
  }
}

export default App;
