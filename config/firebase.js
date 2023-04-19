const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Define Firebase configuration object using values from environment variables
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    databaseUrl: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

// Initialize Firebase app with configuration object
firebase.initializeApp(firebaseConfig);

// Export Firebase app for use in other modules
module.exports = firebase;
