import 'react-dates/initialize';
import React, { Component } from 'react';
import axios from 'axios/index';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class Activity extends Component {

  componentWillMount() {
    this.setState({
      activity: '',
      startDate: moment().subtract(1, 'day'),
      endDate: moment(),
      lastStart: '',
      lastEnd: ''
    });

    // fetch activity
    // this should also be checking for valid token first
    //this.getActivity();
  }

  getActivity() {
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
    const lastStart = this.state.startDate;
    const lastEnd = this.state.endDate;
    this.setState({ lastStart, lastEnd });
    console.log(this.state);
    console.log(startDate, endDate);
    const uri = `https://api.fitbit.com/1/user/2C4GFG/activities/steps/date/${startDate}/${endDate}.json`;
    const accessToken = localStorage.getItem('access_token');
    const headers = {'Authorization': `Bearer ${accessToken}`};

    axios.get(uri, { headers})
      .then(response => {
        this.setState({activity: response.data.summary});
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDates(startDate, endDate) {
    const self = this;
    this.setState({startDate, endDate});
    setTimeout(function() {
      self.getActivityRange();
    }, 500);
  }

  onDatePickerClose(startDate, endDate) {
    console.log('closed picker');
    //this.setState({startDate, endDate});
    /*if (this.state.lastStart && this.state.lastEnd) {
      // see if already fetched
      if (this.state.lastStart.format('YYYY-MM-DD') == this.state.startDate.format('YYYY-MM-DD') &&
        this.state.lastEnd.format('YYYY-MM-DD') == this.state.endDate.format('YYYY-MM-DD')) {
        console.log('date has not changed. do nothing');
      } else {
        console.log('cool, the dates are different. get some new data');
        this.getActivityRange();
      }
    } else {
      // nothing fetched previously
      console.log('nothing previously fetched, grab some data');
      this.getActivityRange();
    }*/
    //this.getActivityRange();
  }

  render() {
    const { activity } = this.state;

    return (
      <div className="container">
        <DateRangePicker
          startDate={this.state.startDate}
          required={true}
          startDateId="1234"
          endDate={this.state.endDate}
          endDateId="5678"
          onDatesChange={({ startDate, endDate }) => this.handleDates(startDate, endDate)}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
          onClose={ ({ startDate, endDate }) => this.onDatePickerClose(startDate, endDate) }
          isOutsideRange={() => false}
        />
        Activity area
        <pre>{JSON.stringify(activity, null, 2)}</pre>
      </div>
    )
  }
}

export default Activity;
