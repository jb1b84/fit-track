import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

class Weight extends Component {
  constructor() {
    super();

    this.state = {
      weightLogs: []
    };

    this.parseResponse = this.parseResponse.bind(this);
  }

  componentWillMount() {
    this.getWeightLogs();
  }

  getWeightLogs() {
    console.log('fetching weight');
    const startDate = '2018-03-12';
    const endDate = '2018-04-12';

    const endpoint = `/body/log/weight/date/${startDate}/${endDate}.json`;
    const userId = this.props.auth.getUserId();
    const accessToken = this.props.auth.getAccessToken();

    this.props.api.makeRequest(userId, endpoint, accessToken, this.parseResponse);
  }

  parseResponse(dataWeightLogs) {
    console.log('weight response', dataWeightLogs);
    const weightLogs = dataWeightLogs.weight;

    for (var i=0; i < weightLogs.length; i++) {
      // convert fat to a percentage
      let fat = (weightLogs[i].fat / 100);
      let weight = weightLogs[i].weight;

      // and multiply by total pounds
      let totalFat = (fat * weight).toFixed(1);

      if (totalFat > 0) {
        weightLogs[i]['total_fat'] = totalFat;
      }

    }

    this.setState({weightLogs: weightLogs});
  }

  render() {
    const { weightLogs } = this.state;

    return (
      <div className="container">
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={weightLogs} margin={{ top: 30, right: 50, left: 0}}>
            <Line type="monotone" dataKey="total_fat" stroke="#8884d8" type="linear" label="true" />
            <Line type="monotone" dataKey="weight" stroke="#ff141f" type="linear" label="true" />
            <XAxis dataKey="date"/>
            <YAxis/>
            <Tooltip/>
          </LineChart>
        </ResponsiveContainer>
        <pre>{ JSON.stringify(weightLogs, null, 2) }</pre>
      </div>
    )
  }
}

export default Weight;
