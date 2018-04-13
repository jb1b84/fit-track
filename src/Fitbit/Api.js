import axios from 'axios/index';

export default class Api {

  constructor() {
    this.baseUri = 'https://api.fitbit.com/1/user/';

    this.makeRequest = this.makeRequest.bind(this);
    this.onError = this.onError.bind(this);
  }

  makeRequest(user, endpoint, accessToken, callback) {
    const headers = {'Authorization': `Bearer ${accessToken}`, 'Accept-Language': 'en_US'};

    let fullpath = this.baseUri + user + endpoint;

    axios.get(fullpath, { headers })
      .then(response => {
        console.log('inside response');
        callback(response.data);
      })
      .catch(error => {
        this.onError(error);
      })
  }

  onError(e) {
    console.log('API Error:', e);
  }
}