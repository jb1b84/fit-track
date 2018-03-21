import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

class Charts extends Component {
  componentWillMount() {

  }

  render() {
    const data = [
      {date: '1/1/2018', weight: 200},
      {date: '2/1/2018', weight: 180},
      {date: '3/1/2018', weight: 150}
    ];

    return (
      <div className="container">
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={data} margin={{ top: 30, right: 50, left: 0 }}>
            <Line type="monotone" dataKey="weight" stroke="#8884d8" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default Charts;
