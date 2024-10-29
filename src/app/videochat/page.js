"use client";
import React, { useContext, useEffect, useRef } from 'react';
import { Box, Card, Button } from '@chakra-ui/react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, addDoc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
import WebRtcContext from '@/contexts/WebRtcContext';
import NavBar from '@/components/NavBar';

const VideoChat = () => {
  //const { pc, createCall, joinCall, endCall } = useContext(WebRtcContext);

  window.onload = () => {
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
    const pc = new RTCPeerConnection(servers);

    let localStream = null;
    let remoteStream = null;

    // HTML elements
    const webcamButton = document.getElementById('webcamButton');
    const webcamVideo = document.getElementById('webcamVideo');
    const callButton = document.getElementById('callButton');
    const callInput = document.getElementById('callInput');
    const answerButton = document.getElementById('answerButton');
    const remoteVideo = document.getElementById('remoteVideo');
    const hangupButton = document.getElementById('hangupButton');

    // 1. Setup media sources

    webcamButton.onclick = async () => {
      localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      remoteStream = new MediaStream();

      // Push tracks from local stream to peer connection
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });

      // Pull tracks from remote stream, add to video stream
      pc.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          remoteStream.addTrack(track);
        });
      };

      webcamVideo.srcObject = localStream;
      remoteVideo.srcObject = remoteStream;

      callButton.disabled = false;
      answerButton.disabled = false;
      webcamButton.disabled = true;
    };

    // 2. Create an offer
    callButton.onclick = async () => {
      // Reference Firestore collections for signaling
      const callDoc = doc(collection(firestore, "calls"));
      const offerCandidates = collection(callDoc, "offerCandidates");
      const answerCandidates = collection(callDoc, "answerCandidates");

      callInput.value = callDoc.id;

      // Get candidates for caller, save to db
      pc.onicecandidate = (event) => {
        event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
      };

      // Create offer
      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await setDoc(callDoc, { offer })

      // Listen for remote answer
      onSnapshot(callDoc, (snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });

      // When answered, add candidate to peer connection
      onSnapshot(answerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });

      console.log("Creating call...");
      console.log("Call ID:", callDoc.id);
      hangupButton.disabled = false;
    };

    // 3. Answer the call with the unique ID
    answerButton.onclick = async () => {
      const callId = callInput.value;
      const callDoc = doc(firestore, "calls", callId);
      const answerCandidates = collection(callDoc, "answerCandidates");
      const offerCandidates = collection(callDoc, "offerCandidates");

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
          console.log(change);
          if (change.type === 'added') {
            let data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    };
  };
  // useEffect(() => {
  //   if (localStream && localVideoRef.current) {
  //     localVideoRef.current.srcObject = localStream;
  //   }
  //   if (remoteStream && remoteVideoRef.current) {
  //     console.log("Setting remote stream");
  //     remoteVideoRef.current.srcObject = remoteStream;
  //   }
  // }, [localStream, remoteStream]);

  return (
    <Box>
      <NavBar />
      <Card m={10}>
        <h1>Video Chat</h1>
      <div>
        {/* <video ref={localVideoRef} autoPlay playsInline muted />
        <Button onClick={() => createCall()}>Create Call</Button>
        <Button onClick={() => joinCall(prompt("Enter Call ID"))}>Join Call</Button>
        <Button onClick={() => endCall()}>End Call</Button>
        <video ref={remoteVideoRef} autoPlay playsInline /> */}
        <h2>1. Start your Webcam</h2>
        <div className="videos">
          <span>
            <h3>Local Stream</h3>
            <video id="webcamVideo" autoPlay playsInline></video>
          </span>
          <span>
            <h3>Remote Stream</h3>
            <video id="remoteVideo" autoPlay playsInline></video>
          </span>


        </div>

        <button id="webcamButton">Start webcam</button>
        <h2>2. Create a new Call</h2>
        <button id="callButton" disabled>Create Call (offer)</button>

        <h2>3. Join a Call</h2>
        <p>Answer the call from a different browser window or device</p>
        
        <input id="callInput" />
        <button id="answerButton" disabled>Answer</button>

        <h2>4. Hangup</h2>

        <button id="hangupButton" disabled>Hangup</button>
      </div>
      </Card>
    </Box>
  );
};

export default VideoChat;
