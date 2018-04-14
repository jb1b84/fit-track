import history from '../history';
import moment from 'moment';

export default class Auth {

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.setSession = this.setSession.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getUserId = this.getUserId.bind(this);
  }

  login() {
    console.log('logging in');

    if (!this.isAuthenticated()) {
      console.log('token has expired, redirecting...');
      const redirectUri = 'http://localhost:3000/callback';
      let url  = `https://www.fitbit.com/oauth2/authorize?\
response_type=token\
&client_id=22CTXS\
&redirect_uri=${redirectUri}\
&scope=activity%20nutrition%20heartrate%20location%20profile%20settings%20sleep%20social%20weight\
&expires_in=604800`;

      window.location = url;
    }
  }

  logout() {
    console.log('logging out');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('expires_at');

    history.replace('/home');
  }

  setSession(authResult) {
    const queryString = require('query-string');
    const hash = queryString.parse(authResult);

    localStorage.setItem('access_token', hash.access_token);
    localStorage.setItem('user_id', hash.user_id);
    localStorage.setItem('expires_at', moment().add(hash.expires_in).unix());

    history.replace('/home');
  }

  isAuthenticated() {
    // check whether the current time is past the access token's expiry time
    const expiryDate = localStorage.getItem('expires_at')
    if (!expiryDate) {
      console.log('no expiry token');
      return false;
    }

    const expiresAt = moment.unix(
      parseInt(expiryDate)
    );

    let notExpired =  moment().isBefore(expiresAt);
    if (notExpired) {
      console.log('not expired', expiresAt.format());
      return true;
    } else {
      console.log('expired', expiresAt.format());
      return false;
    }
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    return accessToken;
  }

  getUserId() {
    const userId = localStorage.getItem('user_id');

    if (!userId) {
      throw new Error('No user ID found');
    }

    return userId;
  }
}