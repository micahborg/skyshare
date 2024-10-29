"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, addDoc, onSnapshot, getDoc } from "firebase/firestore";

const WebRtcContext = createContext();

export const WebRtcProvider = ({ children }) => {
  const [streamId, setStreamId] = useState("");
  const [messages, setMessages] = useState([]); // Store chat messages
  const pc = useRef(null);
  const dataChannel = useRef(null);

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

    const servers = {
      iceServers: [
        { urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"] },
      ],
      iceCandidatePoolSize: 10,
    };

    pc.current = new RTCPeerConnection(servers);

    // Initialize the data channel
    dataChannel.current = pc.current.createDataChannel("chat");
    dataChannel.current.onmessage = (event) => {
      setMessages((prev) => [...prev, { sender: "remote", text: event.data }]);
    };

    pc.current.ondatachannel = (event) => {
      event.channel.onmessage = (e) => {
        setMessages((prev) => [...prev, { sender: "remote", text: e.data }]);
      };
    };

    return () => {
      pc.current.close();
    };
  }, []);

  const createStream = async () => {
    const firestore = getFirestore();
    const callDoc = doc(collection(firestore, "calls"));
    const offerCandidates = collection(callDoc, "offerCandidates");
    const answerCandidates = collection(callDoc, "answerCandidates");

    pc.current.onicecandidate = (event) => {
      event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
    };

    const offerDescription = await pc.current.createOffer();
    await pc.current.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await setDoc(callDoc, { offer });
    setStreamId(callDoc.id);

    onSnapshot(callDoc, (snapshot) => {
      const data = snapshot.data();
      if (!pc.current.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.current.setRemoteDescription(answerDescription);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current.addIceCandidate(candidate);
        }
      });
    });
  };

  const answerStream = async (streamId) => {
    if (!streamId) {
        console.error("Invalid streamId provided.");
        return;
    }
    const firestore = getFirestore();
    const callDoc = doc(firestore, "calls", streamId);

    // Check if the document with the given streamId exists
    const callSnapshot = await getDoc(callDoc);
    if (!callSnapshot.exists()) {
        console.error(`No call found with streamId: ${streamId}`);
        return;
    }

    const answerCandidates = collection(callDoc, "answerCandidates");
    const offerCandidates = collection(callDoc, "offerCandidates");

    pc.current.onicecandidate = (event) => {
      event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
    };

    const callData = (await getDoc(callDoc)).data();
    const offerDescription = callData.offer;
        
    // Check if offerDescription is valid
    if (!offerDescription || !offerDescription.type || !offerDescription.sdp) {
        console.error("Invalid offer description received:", offerDescription);
        return; // Exit if the offer description is invalid
    }

    try {
        await pc.current.setRemoteDescription(new RTCSessionDescription(offerDescription));
    } catch (error) {
        console.error("Failed to set remote description:", error);
        return; // Handle the error accordingly
    }

    const answerDescription = await pc.current.createAnswer();
    await pc.current.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await setDoc(callDoc, { answer });

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current.addIceCandidate(candidate);
        }
      });
    });
    return callDoc.id;
  };

  const sendMessage = (message) => {
    try {
        dataChannel.current.send(message);
        setMessages((prev) => [...prev, { sender: "local", text: message }]);
    } catch (error) {
        console.error("Error sending message:", error);
    }
  };

  return (
    <WebRtcContext.Provider value={{ createStream, answerStream, sendMessage, streamId, messages }}>
      {children}
    </WebRtcContext.Provider>
  );
};

export const useWebRtc = () => useContext(WebRtcContext);
