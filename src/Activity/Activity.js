import 'react-dates/initialize';
import React, { Component } from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import 'react-dates/lib/css/_datepicker.css';

class Activity extends Component {
  constructor() {
    super();

    this.state = {
      activity: [],
      startDate: moment().subtract(1, 'month'),
      endDate: moment(),
      filters: {
        focusedInput: null
      }
    };

    // required for datepicker
    this.onClose = this.onClose.bind(this);
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);

    // api callback
    this.parseData = this.parseData.bind(this);
  }

  componentWillMount() {
    // fetch activity
    this.getActivityRange();
  }

  getActivityRange() {
    const startDate = this.state.startDate.format('YYYY-MM-DD');
    const endDate = this.state.endDate.format('YYYY-MM-DD');

    const userId = this.props.auth.getUserId();
    const endpoint = `/activities/steps/date/${startDate}/${endDate}.json`;
    const accessToken = this.props.auth.getAccessToken();

    this.props.api.makeRequest(userId, endpoint, accessToken, this.parseData);
  }

  onDatesChange({startDate, endDate}) {
    let state = {...this.state};

    state['endDate'] = endDate;
    state['startDate'] = startDate;

    this.setState(state);

    if (state['filters']['focusedInput'] == null) {
      this.getActivityRange();
    }
  }

  parseData(dataActivity) {
    console.log('in da  callback');
    const activity = dataActivity['activities-steps'];

    for (var i=0; i < activity.length; i++) {
      let stepsStr = activity[i]['value'];
      let stepsInt = parseInt(stepsStr);
      if (stepsInt) {
        activity[i]['steps'] = stepsInt;
      }
    }

    this.setState({activity: activity});

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

  onFocusChange(focusedInput) {
    let state = {...this.state};
    state['filters']['focusedInput'] = focusedInput;

    this.setState(state);
  }

  render() {
    const { startDate, endDate, activity, filters } = this.state;

    return (
      <div className="container">
        <DateRangePicker
          startDate={startDate}
          required={true}
          startDateId="1234"
          endDate={endDate}
          endDateId="5678"
          onDatesChange={this.onDatesChange}
          focusedInput={filters.focusedInput}
          onFocusChange={this.onFocusChange}
          onClose={this.onClose}
          isOutsideRange={() => false}
        />
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={activity} margin={{ top: 30, right: 50, left: 0 }}>
            <Line type="monotone" dataKey="steps" stroke="#8884d8" type="natural" label="true"/>
            <XAxis dataKey="dateTime" />
            <YAxis />
            <Tooltip/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default Activity;
