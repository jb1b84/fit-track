import firebase from 'firebase';

var config = {
  apiKey: process.env.REACT_APP_FIRE_API_KEY,
  authDomain: process.env.REACT_APP_FIRE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIRE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIRE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIRE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIRE_MESSAGING_SENDER_ID
};

var fire = firebase.initializeApp(config);

export default fire;
