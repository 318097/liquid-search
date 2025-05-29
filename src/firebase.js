// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import config from "./config";

const { FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID } =
  config.FIREBASE;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "code404-1601a.firebaseapp.com",
  projectId: "code404-1601a",
  storageBucket: "code404-1601a.appspot.com",
  messagingSenderId: "1022798985328",
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

export const initAnalytics = () => {
  const analytics = getAnalytics(app);
};

export default app;
