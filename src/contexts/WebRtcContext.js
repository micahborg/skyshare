"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, addDoc, onSnapshot, getDoc } from "firebase/firestore";

// Define the WebRtcContext
const WebRtcContext = createContext();

export const WebRtcProvider = ({ children }) => {
  const [callId, setCallId] = useState("");
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);  // Initialize as null initially
  const pc = useRef(null);

  useEffect(() => {
    // Ensure MediaStream and RTCPeerConnection are only accessed on the client
    if (typeof window !== "undefined") {
      const initRemoteStream = new MediaStream();
      setRemoteStream(initRemoteStream);

      // Firebase configuration
      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);

      const servers = {
        iceServers: [
          { urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"] },
        ],
        iceCandidatePoolSize: 10,
      };
      pc.current = new RTCPeerConnection(servers);

      pc.current.ontrack = (event) => {
        // Ensure remoteStream exists before adding tracks
        if (initRemoteStream) {
          event.streams[0].getTracks().forEach((track) => {
            initRemoteStream.addTrack(track);
          });
        }
      };

      // Clean up peer connection on unmount
      return () => {
        pc.current.close();
      };
    }
  }, []);

  const startWebcam = async () => {
    if (typeof window !== "undefined" && navigator.mediaDevices) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      stream.getTracks().forEach((track) => {
        pc.current.addTrack(track, stream);
      });
    }
  };

  const createCall = async () => {
    const firestore = getFirestore();
    const callDoc = doc(collection(firestore, "calls"));
    const offerCandidates = collection(callDoc, "offerCandidates");
    const answerCandidates = collection(callDoc, "answerCandidates");

    setCallId(callDoc.id);

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

    onSnapshot(callDoc, (snapshot) => {
      const data = snapshot.data();
      if (data?.answer && !pc.current.currentRemoteDescription) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.current.setRemoteDescription(answerDescription);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current.addIceCandidate(candidate);
        }
      });
    });
  };

  const answerCall = async (callId) => {
    const firestore = getFirestore();
    const callDoc = doc(firestore, "calls", callId);
    const answerCandidates = collection(callDoc, "answerCandidates");
    const offerCandidates = collection(callDoc, "offerCandidates");

    pc.current.onicecandidate = (event) => {
      event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
    };

    const callData = (await getDoc(callDoc)).data();
    const offerDescription = callData.offer;
    await pc.current.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.current.createAnswer();
    await pc.current.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await setDoc(callDoc, { answer });

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current.addIceCandidate(candidate);
        }
      });
    });
  };

  return (
    <WebRtcContext.Provider value={{ startWebcam, createCall, answerCall, callId, localStream, remoteStream }}>
      {children}
    </WebRtcContext.Provider>
  );
};

// Custom hook for accessing WebRtcContext
export const useWebRtc = () => useContext(WebRtcContext);
