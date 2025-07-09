"use client";
import { initializeApp } from "firebase/app";

const iceServerConfig = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    {
      urls: [process.env.REACT_APP_TURN_SERVER_URL],
      username: process.env.REACT_APP_TURN_SERVER_USERNAME,
      credential: process.env.REACT_APP_TURN_SERVER_CREDENTIAL,
    }
  ],
  iceTransportPolicy: "relay"  // allow all (STUN, TURN, and direct)
};

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export { app, iceServerConfig };