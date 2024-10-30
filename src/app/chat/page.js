"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Flex, Image, Box, Button, Input, VStack, Text } from '@chakra-ui/react';
import NavBar from '@/components/NavBar';
import { useWebRtc } from '@/contexts/WebRtcContext';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import QrScanner from 'qr-scanner'; // import qr-scanner

const Chat = () => {
  const { createStream, answerStream, sendMessage, streamId, messages } = useWebRtc();
  const [message, setMessage] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [streamInput, setStreamInput] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const videoRef = useRef(null); // Reference for video element
  const qrScannerRef = useRef(null); // Reference for QrScanner instance

  useEffect(() => {
    if (showScanner && videoRef.current) {
      qrScannerRef.current = new QrScanner(videoRef.current, (result) => {
        handleScan(result);
      });
      qrScannerRef.current.start(); // Start scanning
    }

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop(); // Cleanup on component unmount
        qrScannerRef.current = null;
      }
    };
  }, [showScanner]);

  const handleScan = async (result) => {
    console.log(result);
    try {
      const data = JSON.parse(result).streamId;
      setStreamInput(data); // Set the stream ID from the QR code
      const response = await answerStream(data); // Join chat using the scanned stream ID
      if (response) {
        setShowScanner(false);  // Hide the scanner after scanning
        setIsJoined(true);      // Set joined state
      }
    } catch (error) {
      console.log("Invalid QR code");
      return;
    }
  };

  const handleSend = () => {
    sendMessage(message);
    setMessage("");
  };

  return (
    <Box>
      <NavBar />
      <VStack m={10}>
        <Button onClick={createStream}>Start a Chat</Button>
        {streamId && 
          <VStack>
            <Text>Stream ID: {streamId}</Text>
            <QRCodeGenerator data={JSON.stringify({"streamId": streamId})} />
          </VStack>
        }
        {!isJoined &&
          <VStack>
            <Input
              placeholder="Enter call ID to join"
              value={streamInput}
              onChange={(e) => setStreamInput(e.target.value)}
            />
            <Button onClick={() => setShowScanner(prev => !prev)}>
              {showScanner ? "Stop Scanning" : "Scan QR to Join"}
            </Button>
            <Button onClick={() => answerStream(streamInput)}>Join a Chat</Button>
          </VStack>
        }

        {/* Video element for QRScanner */}
        {showScanner && (
          <div className="qr-reader">
            <video ref={videoRef}></video>
            <div className="qr-box">
              <Image src="images/qr-frame.svg" alt="QR Frame" width={256} height={256} className="qr-frame" />
            </div>
          </div>
        )}

        <VStack align="start" w="100%" p={4} bg="white" borderRadius="md" maxHeight="400px" overflowY="auto">
          {messages.map((msg, index) => (
            <Text color="black" key={index} alignSelf={msg.sender === "local" ? "end" : "start"}>
              <strong>{msg.sender === "local" ? "You" : "Remote"}:</strong> {msg.text}
            </Text>
          ))}
        </VStack>
        <Input
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSend} disabled={!message}>Send</Button>
      </VStack>
    </Box>
  );
};

export default Chat;
