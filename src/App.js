import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

class App extends Component {
  render() {
    const data = [
      {date: '1/1/2018', weight: 200},
      {date: '2/1/2018', weight: 180},
      {date: '3/1/2018', weight: 150}
    ];

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
