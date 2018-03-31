import 'react-dates/initialize';
import React, { Component } from 'react';
import axios from 'axios/index';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class Activity extends Component {
  constructor() {
    super();

    this.state = {
      activity: '',
      startDate: moment().subtract(1, 'month'),
      endDate: moment(),
      filters: {
        focusedInput: null
      }
    };

    this.onClose = this.onClose.bind(this);
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  componentWillMount() {
    // fetch activity
    // this should also be checking for valid token first
    this.getActivityRange();
  }

  getActivity() {
    // needs an "else" for no token
    if (localStorage.getItem('access_token')) {
      const accessToken = localStorage.getItem('access_token');
      const headers = {'Authorization': `Bearer ${accessToken}`};

      const date = '2018-3-19';
      const uri = `https://api.fitbit.com/1/user/2C4GFG/activities/date/${date}.json`;
      axios.get(uri, { headers})
        .then(response => {
          this.setState({activity: response.data.summary});
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  getActivityRange() {
    const startDate = this.state.startDate.format('YYYY-MM-DD');
    const endDate = this.state.endDate.format('YYYY-MM-DD');
    const uri = `https://api.fitbit.com/1/user/2C4GFG/activities/steps/date/${startDate}/${endDate}.json`;
    const accessToken = localStorage.getItem('access_token');
    const headers = {'Authorization': `Bearer ${accessToken}`};

    axios.get(uri, { headers})
      .then(response => {
        this.setState({activity: response.data['activities-steps']});
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
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
        Activity area
        <pre>{JSON.stringify(activity, null, 2)}</pre>
      </div>
    )
  }
}

export default Activity;
