"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, addDoc, onSnapshot, getDoc } from "firebase/firestore";

const WebRtcContext = createContext();

export const WebRtcProvider = ({ children }) => {
  const [pairId, setPairId] = useState("");
  const [messages, setMessages] = useState([]); // Store chat messages
  const pcs = useRef([]); // Store multiple RTCPeerConnections
  const dataChannels = useRef([]); // Store data channels for each peer

  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    pcs.current = []; // Reset peer connections

    return () => {
      pcs.current.forEach(pc => pc.close());
    };
  }, []);

  const createStream = async () => {
    console.log("Creating stream...");
    const firestore = getFirestore();
    const callDoc = doc(collection(firestore, "calls"));
    const offerCandidates = collection(callDoc, "offerCandidates");
    const answerCandidates = collection(callDoc, "answerCandidates");

    const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun1.l.google.com:19302" }] });
    pcs.current.push(pc); // Add the new peer connection to the array

    pc.onicecandidate = (event) => {
      event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
    };

    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await setDoc(callDoc, { offer });
    setPairId(callDoc.id);

    onSnapshot(callDoc, (snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });

    // Initialize the data channel
    const dataChannel = pc.createDataChannel("chat");
    dataChannels.current.push(dataChannel); // Store the data channel

    dataChannel.onmessage = (event) => {
      setMessages((prev) => [...prev, { sender: "remote", text: event.data }]);
    };
  };

  const answerStream = async (pairId) => {
    if (!pairId) {
      console.error("Invalid pairId provided.");
      return;
    }

    const firestore = getFirestore();
    const callDoc = doc(firestore, "calls", pairId);

    const callSnapshot = await getDoc(callDoc);
    if (!callSnapshot.exists()) {
      console.error(`No call found with pairId: ${pairId}`);
      return;
    }

    const answerCandidates = collection(callDoc, "answerCandidates");
    const offerCandidates = collection(callDoc, "offerCandidates");

    const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun1.l.google.com:19302" }] });
    pcs.current.push(pc); // Add the new peer connection to the array

    pc.onicecandidate = (event) => {
      event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
    };

    const callData = (await getDoc(callDoc)).data();
    const offerDescription = callData.offer;

    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await setDoc(callDoc, { answer });

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });

    // Initialize the data channel
    pc.ondatachannel = (event) => {
      const dataChannel = event.channel;
      dataChannels.current.push(dataChannel); // Store the data channel

      dataChannel.onmessage = (e) => {
        setMessages((prev) => [...prev, { sender: "remote", text: e.data }]);
      };
    };
  };

  const sendMessage = (message) => {
    dataChannels.current.forEach(channel => {
      try {
        channel.send(message); // Send message to all connected channels
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });
    setMessages((prev) => [...prev, { sender: "local", text: message }]);
  };

  return (
    <WebRtcContext.Provider value={{ createStream, answerStream, sendMessage, pairId, messages }}>
      {children}
    </WebRtcContext.Provider>
  );
};

export const useWebRtc = () => useContext(WebRtcContext);
