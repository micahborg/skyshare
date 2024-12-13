"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, addDoc, onSnapshot, getDoc } from "firebase/firestore";

const WebRtcContext = createContext();

export const WebRtcProvider = ({ children }) => {
  const [pairId, setPairId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [chats, setChats] = useState([]); // Store chat messages
  const [files, setFiles] = useState([])
  const pc = useRef(null);
  const dataChannel = useRef(null);
  
  // Variables to track the file transfer state
  let fileChunks = [];
  let receivedFileSize = 0;
  let expectedFileSize = 0;
  let fileName = '';

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
      // iceServers: [
      //   { urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"] },
      // ],
      // iceCandidatePoolSize: 10,
      iceServers: [
        {
          urls: "stun:openrelay.metered.ca:80"
        },
        {
          urls: "turn:openrelay.metered.ca:80",
          username: "openrelayproject",
          credential: "openrelayproject"
        },
        {
          urls: "turn:openrelay.metered.ca:443",
          username: "openrelayproject",
          credential: "openrelayproject"
        },
        {
          urls: "turn:openrelay.metered.ca:443?transport=tcp",
          username: "openrelayproject",
          credential: "openrelayproject"
        }
      ],
    };

    pc.current = new RTCPeerConnection(servers);
    console.log("Peer connection created:", pc.current);

    // Initialize the data channel
    dataChannel.current = pc.current.createDataChannel("chat");
    console.log("Data channel created:", dataChannel.current);

    dataChannel.current.onmessage = (event) => {
      console.log("Message received on data channel:", event.data);
      const dataType = typeof event.data;
      console.log("Data type received:", dataType);
      if (typeof event.data === "string") {
        console.log("Received string message:", event.data);
        if (event.data.type === "text") {
          setChats((prev) => [...prev, { sender: "remote", data: event.data }]);
        } else {
          try {
            const metadata = JSON.parse(event.data);
            fileName = metadata.name; // Store the file name
            expectedFileSize = metadata.size;  // Store the expected file size
            console.log("Received file metadata:", metadata);
          } catch (error) {
            console.error("Failed to parse metadata:", error);
          }
        }
      } else {
        console.log("handling file chunk...");
        handleFileChunk(event.data);
      }
    };

    pc.current.ondatachannel = (event) => {
      console.log("Data channel received:", event.channel);
      event.channel.onmessage = (e) => {
        console.log("Message received on data channel:", e.data);
        const dataType = typeof e.data;
        console.log("Data type received:", dataType);
        if (typeof e.data === "string") {
          if (e.data.type === "text") {
            setChats((prev) => [...prev, { sender: "remote", data: e.data }]);
          } else {
            try {
              const metadata = JSON.parse(e.data);
              fileName = metadata.name; // Store the file name
              expectedFileSize = metadata.size;  // Store the expected file size
              console.log("Received file metadata:", metadata);
            } catch (error) {
              console.error("Failed to parse metadata:", error);
            }
          }
        } else {
          console.log("handling file chunk...");
          handleFileChunk(e.data);
        }
      };

    };

    if (pc.current.connectionState === 'failed') {
      console.log("Connection state failed. Restarting ICE...");
      pc.current.restartIce()
    }

    if (pc.current.iceconnectionState === 'failed') {
      console.log("ICE connection state failed. Restarting ICE...");
      pc.current.restartIce()
    }

    dataChannel.current.onopen = () => {
      setIsConnected(true);
      console.log("Data channel opened.")
    };
    
    dataChannel.current.onclose = () => {
      setIsConnected(false);
      console.log("Data channel closed.");
    };
    
    dataChannel.current.onerror = (error) => {
      setIsConnected(false);
      console.error("Data channel error:", error);
    };
  

    return () => {
      console.log("Closing connection...");
      setIsConnected(false);
      pc.current.close();
    };
  }, []);

  const beginPair = async () => {
    console.log("Creating stream...");
    const firestore = getFirestore();
    const callDoc = doc(collection(firestore, "calls"));
    const offerCandidates = collection(callDoc, "offerCandidates");
    const answerCandidates = collection(callDoc, "answerCandidates");

    pc.current.onicecandidate = (event) => {
      console.log("New ICE candidate:", event.candidate);
      event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
    };

    const offerDescription = await pc.current.createOffer();
    //const userAgent = navigator.userAgent;
    await pc.current.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
      // pubKey: "senders public key, testing for now",
      // deviceInfo: userAgent,
    };

    await setDoc(callDoc, { offer });
    setPairId(callDoc.id);
    console.log("Pair ID:", callDoc.id);

    // begin try something new ---
    let candidatesComplete = false;

    // Adding event listener for ICE gathering state change
    pc.current.onicegatheringstatechange = () => {
      console.log('iceGatheringState:', pc.current.iceGatheringState);
      if (pc.current.iceGatheringState === 'complete') {
        console.log('ICE gathering complete. Sending offer.');
        candidatesComplete = true;
      }
    };

    // Add a timeout to force sending the offer if candidates are not complete
    setTimeout(() => {
      if (!candidatesComplete) {
        console.log('Candidates processing not ended. Ending it...');
        candidatesComplete = true;
      }
    }, 3000); // 3 seconds timeout
    // end try something new ---

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

    return callDoc.id;
  };

  const connectDevice = async (pairId) => {
    if (!pairId) {
        console.error("Invalid pairId provided.");
        return;
    }
    const firestore = getFirestore();
    const callDoc = doc(firestore, "calls", pairId);

    // Check if the document with the given pairId exists
    const callSnapshot = await getDoc(callDoc);
    if (!callSnapshot.exists()) {
        console.error(`No call found with pairId: ${pairId}`);
        return;
    }

    const answerCandidates = collection(callDoc, "answerCandidates");
    const offerCandidates = collection(callDoc, "offerCandidates");

    pc.current.onicecandidate = (event) => {
      console.log("New ICE candidate:", event.candidate);
      event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
    };

    const callData = (await getDoc(callDoc)).data();
    const offerDescription = callData.offer;
        
    // Check if offerDescription is valid
    if (!offerDescription || !offerDescription.type || !offerDescription.sdp) {
        console.error("Invalid offer description received:", offerDescription);
        // TO DO: throw a Chakra UI Toast error notification
        return; // Exit if the offer description is invalid
    }

    try {
        await pc.current.setRemoteDescription(new RTCSessionDescription(offerDescription));
    } catch (error) {
        console.error("Failed to set remote description:", error);
        return; // Handle the error accordingly
    }

    const answerDescription = await pc.current.createAnswer();
    //const userAgent = navigator.userAgent;
    await pc.current.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
      // pubKey: "receivers public key, testing for now",
      // deviceInfo: userAgent,
    };

    await setDoc(callDoc, { answer });
    
    // begin try something new ---
    // Use similar logic for ICE gathering state
    let candidatesComplete = false;

    // Adding event listener for ICE gathering state change
    pc.current.onicegatheringstatechange = () => {
      console.log('iceGatheringState:', pc.current.iceGatheringState);
      if (pc.current.iceGatheringState === 'complete') {
        console.log('ICE gathering complete.');
        candidatesComplete = true;
      }
    };

    // Add a timeout to force adding ICE candidates if not complete
    setTimeout(() => {
      if (!candidatesComplete) {
        console.log('Candidates processing not ended.');
        candidatesComplete = true;
      }
    }, 3000); // 3 seconds timeout
    // end try something new ---
    
    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New ICE candidate:", change.doc.data());
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current.addIceCandidate(candidate);
        }
      });
    });

    setPairId(callDoc.id);
    return callDoc.id;
  };

  const sendMessage = (message) => {
    try {
        dataChannel.current.send(message);
        if (message.type === "text") {
          setChats((prev) => [...prev, { sender: "local", data: message }]);
        }
    } catch (error) {
        console.error("Error sending message:", error);
    }
  };

  function handleFileChunk(chunk) {
    console.log("Adding file chunk:", chunk);
    fileChunks.push(chunk);  // Add the incoming chunk to the array
    console.log("File chunks:", fileChunks);
    receivedFileSize += chunk.byteLength;
    console.log("Received file chunk:", receivedFileSize, "bytes", "Expected:", expectedFileSize, "bytes", "File name:", fileName, "Chunk size:", chunk.byteLength + "bytes");
  
    if (receivedFileSize === expectedFileSize) {
      // Once all chunks are received, reassemble the file
      const receivedBlob = new Blob(fileChunks);
  
      // Create a download link
      const fileUrl = URL.createObjectURL(receivedBlob);
  
      // Display the file with its metadata (e.g., file name)
      console.log("File received:", fileUrl);
      setFiles((prev) => [...prev, { sender: "remote", data: fileUrl, fileName: fileName }]);
  
      // Optionally, clear the fileChunks array for the next file transfer
      fileChunks = [];
      receivedFileSize = 0;
      fileName = '';
    }
  }

  return (
    <WebRtcContext.Provider value={{ beginPair, connectDevice, sendMessage, isConnected, pairId, files, chats }}>
      {children}
    </WebRtcContext.Provider>
  );
};

export const useWebRtc = () => useContext(WebRtcContext);
