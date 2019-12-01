const firebase = require('firebase-admin')

const config = {
    apiKey: "AIzaSyBR9CCgAuKp0OupBKKKiG-C8islRUaOFFs",
    authDomain: "testproject1-203615.firebaseapp.com",
    databaseURL: "https://testproject1-203615.firebaseio.com",
    projectId: "testproject1-203615",
    storageBucket: "testproject1-203615.appspot.com",
    messagingSenderId: "681667456637"
};
firebase.initializeApp(config);
