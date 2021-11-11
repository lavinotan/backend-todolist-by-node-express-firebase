'use strict';

//const dotenv = require('dotenv');
const assert = require('assert');

//dotenv.config();

// const {
//     LOCALPORT,
//     HOST,
//     HOST_URL,
//     API_KEY,
//     AUTH_DOMAIN,
//     PROJECT_ID,
//     STORAGE_BUCKET,
//     MESSAGING_SENDER_ID,
//     APP_ID
// } = process.env;

const LOCALPORT = 4000;
const HOST = "localhost";
const HOST_URL = "http://localhost:4000";

const API_KEY = "AIzaSyCsx9HKaUbg8POsY71kjInvng6yPRlMzKQ";
const AUTH_DOMAIN = "react-todolist-node.firebaseapp.com";
const PROJECT_ID = "react-todolist-node";
const STORAGE_BUCKET = "react-todolist-node.appspot.com";
const MESSAGING_SENDER_ID = "1076601616814";
const APP_ID = "1:1076601616814:web:87645bfb06321efa62303f"

assert(LOCALPORT, "PORT is required");
assert(HOST, "Host is required");

module.exports = {
    port: LOCALPORT,
    host: HOST,
    url: HOST_URL,
    firebaseConfig: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID
    }
}