import 'react-dates/initialize';
import React, { Component } from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import 'react-dates/lib/css/_datepicker.css';

class Weight extends Component {
  constructor() {
    super();

    this.state = {
      weightLogs: [],
      startDate: moment().subtract(1, 'month'),
      endDate: moment(),
      filters: {
        focusedInput: null
      }
    };

    // api callback
    this.parseResponse = this.parseResponse.bind(this);

    // required for datepicker
    this.onClose = this.onClose.bind(this);
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  componentWillMount() {
    this.getWeightLogs();
  }

  getWeightLogs() {
    console.log('fetching weight');
    const startDate = this.state.startDate.format('YYYY-MM-DD');
    const endDate = this.state.endDate.format('YYYY-MM-DD');

    // TODO: use moment to check here that the range isn't > 31 days

    const endpoint = `/body/log/weight/date/${startDate}/${endDate}.json`;
    const userId = this.props.auth.getUserId();
    const accessToken = this.props.auth.getAccessToken();

    this.props.api.makeRequest(userId, endpoint, accessToken, this.parseResponse);
  }

  parseResponse(dataWeightLogs) {
    console.log('weight response', dataWeightLogs);
    const weightLogs = dataWeightLogs.weight;

    for (let i=0; i < weightLogs.length; i++) {
      // convert fat to a percentage
      let fat = (weightLogs[i].fat / 100);
      let weight = weightLogs[i].weight;

      // and multiply by total pounds
      let totalFat = (fat * weight).toFixed(1);

      if (totalFat > 0) {
        weightLogs[i]['total_fat'] = totalFat;

        // and the rest is lean mass
        let leanMass = (weight - totalFat).toFixed(1);
        weightLogs[i]['lean_mass'] = leanMass;
      }

    }

    this.setState({weightLogs: weightLogs});
  }

  onClose({startDate, endDate}) {
    const previousEndDate = this.state.endDate;

    if (previousEndDate == endDate) {
      if (startDate > previousEndDate) {
        const endDate = startDate;
        this.onDatesChange({ startDate, endDate });
      } else {
        this.onDatesChange({ startDate, endDate });
      }
    }
  }

  onDatesChange({startDate, endDate}) {
    let state = {...this.state};

    state['endDate'] = endDate;
    state['startDate'] = startDate;

    this.setState(state);

    if (state['filters']['focusedInput'] == null) {
      this.getWeightLogs();
    }
  }

  onFocusChange(focusedInput) {
    let state = {...this.state};
    state['filters']['focusedInput'] = focusedInput;

    this.setState(state);
  }

  render() {
    const { weightLogs, startDate, endDate, filters } = this.state;

    return (
      <div className="container">
        <DateRangePicker
          startDate={startDate}
          required={true}
          endDate={endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={filters.focusedInput}
          onFocusChange={this.onFocusChange}
          onClose={this.onClose}
          isOutsideRange={() => false}
          startDateId="weight1"
          endDateId="weight2"
        />
        <ResponsiveContainer width="100%" height={500}>
          <AreaChart data={weightLogs} margin={{ top: 30, right: 50, left: 0}}>
            <Area type="linear" dataKey="total_fat" fillOpacity="0.5" stroke="#8884d8" fill="#8884d8" type="linear" />
            <Area type="linear" dataKey="weight" fillOpacity="0.5" stroke="	#0000FF" fill="	#0000FF" type="linear" />
            <Area type="linear" fillOpacity="0.5" dataKey="lean_mass" stroke="#82ca9d" fill="#82ca9d" type="linear"/>
            <XAxis dataKey="date"/>
            <YAxis/>
            <Tooltip/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default Weight;
