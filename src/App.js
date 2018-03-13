import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import fire from './fire';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { messages: [], users: [] };
  }

  componentWillMount() {
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    });

    let usersRef = fire.database().ref('users').orderByKey().limitToLast(100);
    let i = 0;

    usersRef.on('child_added', snapshot => {
      let userKey = snapshot.val();
      // let userItem = userKey[Object.keys(userKey)[0]];
      let user = { name: userKey.name, id: i, email: userKey.email };

      this.setState({ users: [user].concat(this.state.users) });

      i++;
    });

  }

  addMessage(e) {
    e.preventDefault();
    fire.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = '';
  }

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

        <form onSubmit={this.addMessage.bind(this)}>
          <input type="text" ref={ el => this.inputEl = el }/>
          <input type="submit"/>
          <h3>Messages</h3>
          <ul>
            {
              this.state.messages.map( message => <li key={message.id}>{message.text}</li>)
            }
          </ul>
          <h3>Users</h3>
          <ul>
            {
              this.state.users.map( user => <li key={user.id}>{user.name} ({user.email})</li>)
            }
          </ul>
        </form>
      </div>
    );
  }
}

export default App;
