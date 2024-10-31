// Chat.js
"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Input, VStack, Text, Image } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import { useWebRtc } from "@/contexts/WebRtcContext";
import { useLoading } from "@/contexts/LoadingContext";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import QRCodeScanner from "@/components/QRCodeScanner";

const Chat = () => {
  const { createStream, answerStream, sendMessage, pairId, messages } = useWebRtc();
  const [message, setMessage] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [streamInput, setStreamInput] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleScan = async (result) => {
    console.log(result);
    try {
      const data = JSON.parse(result).pairId;
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
        {pairId && (
          <VStack>
            <Text>Stream ID: {pairId}</Text>
            <QRCodeGenerator data={JSON.stringify({ pairId })} />
          </VStack>
        )}
        {!isJoined && (
          <VStack>
            <Input
              placeholder="Enter call ID to join"
              value={streamInput}
              onChange={(e) => setStreamInput(e.target.value)}
            />
            <Button onClick={() => setShowScanner((prev) => !prev)}>
              {showScanner ? "Stop Scanning" : "Scan QR to Join"}
            </Button>
            <Button onClick={() => answerStream(streamInput)}>Join a Chat</Button>
          </VStack>
        )}

        {/* QRCodeScanner */}
        <QRCodeScanner onScan={handleScan} isActive={showScanner} />

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
