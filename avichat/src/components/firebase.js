import firebase from "firebase";

const config = {
  apiKey: "AIzaSyD7zDOhyooQ6N6WvUSQPb4t6Dirtd83sTQ",
  authDomain: "slackish-adb98.firebaseapp.com",
  databaseURL: "https://slackish-adb98.firebaseio.com",
  projectId: "slackish-adb98",
  storageBucket: "slackish-adb98.appspot.com",
  messagingSenderId: "990880907645"
};

firebase.initializeApp(config);

// Variable to simplify the code later on in our application
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;
