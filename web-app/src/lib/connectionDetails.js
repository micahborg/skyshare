import { initializeApp } from "firebase/app";

const iceServerConfig = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    {
      urls: [process.env.NEXT_PUBLIC_TURN_SERVER_URL],
      username: process.env.NEXT_PUBLIC_TURN_SERVER_USERNAME,
      credential: process.env.NEXT_PUBLIC_TURN_SERVER_CREDENTIAL,
    }
  ],
  iceTransportPolicy: "all"  // allow all (STUN, TURN, and direct)
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export { app, iceServerConfig };