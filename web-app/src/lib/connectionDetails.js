import { initializeApp } from "firebase/app";

// Function to fetch fresh TURN credentials
const getIceServerConfig = async (pairId = null) => {
  try {
    const params = new URLSearchParams({ service: 'turn' });
    if (pairId) {
      params.append('pairId', pairId);
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_TURN_API_BASE_URL}/api/turn?${params}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch TURN credentials: ${response.status}`);
    }
    
    const data = await response.json();
    return data.iceServerConfig;
  } catch (error) {
    console.error('Error fetching TURN credentials:', error);
    
    // Fallback to STUN-only configuration
    return {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
      ],
      iceTransportPolicy: "all"
    };
  }
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

export { app, getIceServerConfig };