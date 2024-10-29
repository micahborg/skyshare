// components/VideoChat.js
"use client";
import React, { useEffect } from "react";
import { Box, Card, Button, Input } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import { useWebRtc } from "@/contexts/WebRtcContext";

const VideoChat = () => {
  const { startWebcam, createCall, answerCall, callId, localStream, remoteStream } = useWebRtc();

  useEffect(() => {
    if (localStream) {
      document.getElementById("webcamVideo").srcObject = localStream;
    }
    if (remoteStream) {
      document.getElementById("remoteVideo").srcObject = remoteStream;
    }
  }, [localStream, remoteStream]);

  return (
    <Box>
      <NavBar />
      <Card m={10}>
        <h1>Video Chat</h1>
        <div>
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
          <Button onClick={startWebcam}>Start webcam</Button>
          <h2>2. Create a new Call</h2>
          <Button onClick={createCall} disabled={!localStream}>
            Create Call (offer)
          </Button>
          <h2>3. Join a Call</h2>
          <p>Answer the call from a different browser window or device</p>
          <Input value={callId} placeholder="Call ID" readOnly />
          <Button onClick={() => answerCall(callId)} disabled={!localStream}>
            Answer
          </Button>
        </div>
      </Card>
    </Box>
  );
};

export default VideoChat;
