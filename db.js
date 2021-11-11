const firebase = require("firebase");
require("firebase/firestore");
const config = require("./config");

firebase.initializeApp(config.firebaseConfig);

const db = firebase.firestore();

module.exports = {
    db,
    firebase
};
