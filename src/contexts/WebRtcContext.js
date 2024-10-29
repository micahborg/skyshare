// "use client";
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, doc, setDoc, addDoc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
// import { createContext, useEffect, useState, useRef } from "react";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const firestore = getFirestore(app);

// // WebRtcContext setup
// const WebRtcContext = createContext(null);

// export const WebRtcProvider = ({ children }) => {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);

//   const servers = {
//     iceServers: [
//       { urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"] },
//     ],
//     iceCandidatePoolSize: 10,
//   };
//   const pc = new RTCPeerConnection(servers);
//   const callIdRef = useRef("");

//   const startLocalStream = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       setRemoteStream(new MediaStream());
      
//       stream.getTracks().forEach((track) => {
//         pc.addTrack(track, stream);
//       });

//       // Pull tracks from remoteStream and add them to the peer connection
//       pc.ontrack = (event) => {
//         event.streams[0].getTracks().forEach((track) => {
//           remoteStream.addTrack(track);
//         });
//       };

//       setLocalStream(stream);
//       setRemoteStream(remoteStream);
//     } catch (error) {
//       console.error("Error accessing media devices.", error);
//     }
//   };

//   const createCall = async () => {
//     console.log("Creating call...");

//     // Reference Firestore collections for signaling
//     const callDoc = doc(collection(firestore, "calls"));
//     callIdRef.current = callDoc.id; // Save the call ID to reference later
//     const offerCandidates = collection(callDoc, "offerCandidates");
//     const answerCandidates = collection(callDoc, "answerCandidates");

//     // Get candidates for caller, save to db
//     pc.onicecandidate = event => {
//       event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
//     };

//     // Create offer
//     const offerDescription = await pc.createOffer();
//     await pc.setLocalDescription(offerDescription);

//     const offer = {
//       sdp: offerDescription.sdp,
//       type: offerDescription.type,
//     };

//     await setDoc(callDoc, { offer });

//     // Listen for remote answer
//     onSnapshot(callDoc, (snapshot) => {
//       const data = snapshot.data();
//       if (data?.answer && !pc.currentRemoteDescription) {
//         const answerDescription = new RTCSessionDescription(data.answer);
//         console.log("Setting remote description:", answerDescription);
//         pc.setRemoteDescription(answerDescription);
//       }
//     });

//     // When answered, add candidate to peer connection
//     onSnapshot(answerCandidates, (snapshot) => {
//       snapshot.docChanges().forEach((change) => {
//         if (change.type === "added") {
//           const candidate = new RTCIceCandidate(change.doc.data());
//           pc.addIceCandidate(candidate);
//         }
//       });
//     });

//     console.log("Call ID:", callIdRef.current);
//     return callIdRef.current;
//   };

//   const joinCall = async (callId) => {
//     callIdRef.current = callId;
//     const callDoc = doc(firestore, "calls", callId);
//     const answerCandidates = collection(callDoc, "answerCandidates");
//     const offerCandidates = collection(callDoc, "offerCandidates");

//     pc.onicecandidate = event => {
//       event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
//     };

//     const callData = (await getDoc(callDoc)).data();

//     const offerDescription = callData.offer;
//     await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

//     const answerDescription = await pc.createAnswer();
//     await pc.setLocalDescription(answerDescription);

//     const answer = {
//       type: answerDescription.type,
//       sdp: answerDescription.sdp,
//     };

//     await setDoc(callDoc, { answer });

//     onSnapshot(offerCandidates, (snapshot) => {
//       snapshot.docChanges().forEach((change) => {
//         console.log("Offer candidate:", change.doc.data());
//         if (change.type === "added") {
//           let data = change.doc.data();
//           pc.addIceCandidate(new RTCIceCandidate(data));
//         }
//       });
//     });
//   };

//   const endCall = () => {
//     pc.close();
//     console.log("Call ended.");
//     setLocalStream(null);
//     setRemoteStream(null);
//     callIdRef.current = "";
//   };

//   useEffect(() => {
//     startLocalStream();
//   }, []);

//   return (
//     <WebRtcContext.Provider value={{ pc, localStream, remoteStream, createCall, joinCall, endCall }}>
//       {children}
//     </WebRtcContext.Provider>
//   );
// };

// export default WebRtcContext;
