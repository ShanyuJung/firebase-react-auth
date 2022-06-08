// import firebase from "firebase/app";
// import "firebase/auth";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkvX8elZjMYkUmaHkHMZu__77Od_VpWxY",
  authDomain: "auth-development-f18b4.firebaseapp.com",
  projectId: "auth-development-f18b4",
  storageBucket: "auth-development-f18b4.appspot.com",
  messagingSenderId: "70808817780",
  appId: "1:70808817780:web:c726d3a061dcd1e73d0121",
};

const app = firebase.initializeApp(firebaseConfig);

// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// });

export const auth = app.auth();
export default app;
