const envCallback = (process.env.NODE_ENV && process.env.NODE_ENV === 'development') ?
  'http://localhost:3000/callback' : process.env.REACT_APP_LIVE_DOMAIN;

export const AUTH_CONFIG = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  callbackUrl: envCallback
}
