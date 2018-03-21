import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { messages: [], users: [] };
  }

  componentWillMount() {

  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
  }

  logout() {
  }

  render() {
    return (
      <div className="App">
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Fitbit + React</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'profile')}
            >
              Profile
            </Button>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'activity')}
            >
              Activity
            </Button>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'charts')}
            >
              Charts
            </Button>
          </Navbar.Header>
        </Navbar>

        <header className="App-header">
          <h1 className="App-title">Fit tracking</h1>
        </header>
        <p className="App-intro">
          throw some charts and shit in here
        </p>
      </div>
    );
  }
}

export default App;
