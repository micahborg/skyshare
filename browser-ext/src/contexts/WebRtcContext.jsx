"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
//import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, updateDoc, addDoc, onSnapshot, getDoc, serverTimestamp } from "firebase/firestore";
import { app, iceServerConfig } from '../lib/connectionDetails';

const WebRtcContext = createContext();

export const WebRtcProvider = ({ children }) => {
  const [pairId, setPairId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]); // Store chat messages
  const [chats, setChats] = useState([]); // Store chat messages
  const [files, setFiles] = useState([]); // received file blobs
  const pc = useRef(null);
  const dataChannel = useRef(null);

  //region File Transfer -- Vars
  let receivedFile = {};
  let receiveBuffer = [];
  let receivedSize = 0;

  useEffect(() => {
    console.log("Initializing WebRTC connection...");
    getFirestore(app);

    pc.current = new RTCPeerConnection(iceServerConfig);

    console.log("Peer connection created:", pc.current);

    // Set up ICE candidate handling
    pc.current.oniceconnectionstatechange = () => {
      console.log("ICE connection state:", pc.current.iceConnectionState);

      if (pc.current.iceConnectionState === "connected") {
        console.log("✅ ICE connection established (STUN or TURN)");
      }

      if (pc.current.iceConnectionState === "failed") {
        console.error("❌ ICE connection failed (likely no viable candidate)");
      }
    };

    // Initialize the data channel
    dataChannel.current = pc.current.createDataChannel("dataChannel");
    console.log("Data channel created:", dataChannel.current);

    // Set up data channel properties
    dataChannel.current.binaryType = "arraybuffer";
    dataChannel.current.bufferedAmountLowThreshold = 0;

    // Set up event listeners for the data channel
    dataChannel.current.onmessage = (msg) => {
      console.log("Message received on data channel:", msg.data);
      if (typeof msg.data === "string") {
        const data = JSON.parse(msg.data);
        if (!data["size"]) {
          setChats((prev) => [...prev, { sender: "remote", data: msg.data }]);
          setMessages((prev) => [...prev, { sender: "remote", data: msg.data }]);
        } else {
          onReceiveFile(msg);
          setMessages((prev) => [...prev, { sender: "remote", data: msg.data }]);
        }
      } else {
        onReceiveFile(msg);
        setMessages((prev) => [...prev, { sender: "remote", data: msg.data }]);
      }
    };

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
      console.log("Data channel error:", error);
    };

    pc.current.ondatachannel = (event) => {
      console.log("Data channel received:", event.channel);
      dataChannel.current = event.channel;
      dataChannel.current.binaryType = "arraybuffer";
      dataChannel.current.bufferedAmountLowThreshold = 0;
      event.channel.onmessage = (msg) => {
        console.log("Message received on data channel:", msg.data);
        if (typeof msg.data === "string") {
          const data = JSON.parse(msg.data);
          if (!data["size"]) {
            setChats((prev) => [...prev, { sender: "remote", data: msg.data }]);
            setMessages((prev) => [...prev, { sender: "remote", data: msg.data }]);
          } else {
            onReceiveFile(msg);
            setMessages((prev) => [...prev, { sender: "remote", data: msg.data }]);
          }
        } else {
          onReceiveFile(msg);
          setMessages((prev) => [...prev, { sender: "remote", data: msg.data }]);
        }
      };
      event.channel.onclose = () => {
        console.log("Data channel closed.");
        setIsConnected(false);
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

    return () => {
      console.log("Closing connection...");
      setIsConnected(false);
      pc.current.close();
    };
  }, []);

  //region Begin Pair
  const beginPair = async () => {
    console.log("Creating stream...");
    const firestore = getFirestore();
    const callDoc = doc(collection(firestore, "calls"));
    const offerCandidates = collection(callDoc, "offerCandidates");
    const answerCandidates = collection(callDoc, "answerCandidates");

    pc.current.onicecandidate = (event) => {
      console.log("New ICE candidate:", event.candidate);
      if (event.candidate) {
        addDoc(offerCandidates, event.candidate.toJSON());
      } else {
        updateDoc(callDoc, { iceGatheringComplete: true });
      }
    };

    const offerDescription = await pc.current.createOffer();
    await pc.current.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await setDoc(callDoc, { 
      offer,
      createdAt: serverTimestamp() // Store creation time for TTL 
    });
    setPairId(callDoc.id);
    console.log("Pair ID:", callDoc.id);

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

  //region Connect Device
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
      console.log("New ICE candidate:", event.candidate); // type srflx (STUN) or relay (TURN)
      if (event.candidate) {
        addDoc(answerCandidates, event.candidate.toJSON());
      } else {
        updateDoc(callDoc, { iceGatheringComplete: true });
      }
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
    };

    await updateDoc(callDoc, { answer });
    
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

  //region File Transfer
  async function sendFile(file) {
    return new Promise((resolve, reject) => {
      dataChannel.current.send(
        JSON.stringify({
          name: file.name,
          type: file.type,
          size: file.size,
        })
      )

      let offset = 0;
      let maxChunkSize = 16384; // 16KB

      console.log("Sending file:", file.name);
      console.log(dataChannel.current.bufferedAmountLowThreshold);

      file.arrayBuffer().then((buffer) => {
        const send = () => {
          while (buffer.byteLength) {
            if (dataChannel.current.bufferedAmount > dataChannel.current.bufferedAmountLowThreshold) {
              dataChannel.current.onbufferedamountlow = () => {
                dataChannel.current.onbufferedamountlow = null;
                send();
              };
              return;
            }
            const chunk = buffer.slice(0, maxChunkSize);
            buffer = buffer.slice(maxChunkSize, buffer.byteLength);
            dataChannel.current.send(chunk);
            offset += maxChunkSize;
            console.log("Sent " + offset + " bytes.");

            if (buffer.byteLength === 0) {
              console.log(`Finished sending ${file.name}`);
              resolve(); // ✅ Ensure Promise resolves when file sending completes
            }
          } 
        };

        send();
      });
    });
  }

  function onReceiveFile(event) {
    if (!receivedFile["name"]) {
      const file = JSON.parse(event.data);
      receivedFile = file; // store file metadata (name, size, type)
      return;
    }
  
    receiveBuffer.push(event.data);
    receivedSize += event.data.byteLength;
    setMessages([]);
    console.log("WebRTC messages cleared.");
  
    if (receivedSize === receivedFile["size"]) {
      const blob = new Blob(receiveBuffer, { type: receivedFile["type"] });
      const file = new File([blob], receivedFile["name"], { type: receivedFile["type"] });
  
      // reset state
      receiveBuffer = [];
      receivedSize = 0;
      receivedFile = {};
  
      setFiles((prev) => [...prev, file]);
    }
  }  

  const sendMessage = (message) => {
    try {
        dataChannel.current.send(message);
        setChats((prev) => [...prev, { sender: "local", data: message }]);
        setMessages((prev) => [...prev, { sender: "local", data: message }]);
    } catch (error) {
        console.error("Error sending message:", error);
    }
  };

  return (
    <WebRtcContext.Provider value={{ beginPair, connectDevice, sendMessage, sendFile, isConnected, pairId, messages, chats, files }}>
      {children}
    </WebRtcContext.Provider>
  );
};

export const useWebRtc = () => useContext(WebRtcContext);