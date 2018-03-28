import React, { Component } from 'react';
import moment from 'moment';

class Home extends Component {

  render() {

    let expire = 3600;
    console.log('expire', expire);
    let now = moment();
    console.log('now', now.unix());
    let future = moment().add(expire, 'seconds');
    console.log('future', future);
    let check = moment(future).isAfter(now);
    console.log('in the future? ', check);

    return (
      <div className="container">
        Hello!
      </div>
    );
  }
}

export default Home;
