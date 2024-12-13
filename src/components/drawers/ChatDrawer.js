"use client";
import React, { useState, useEffect } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  Input,
  Box,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { useWebRtc } from "@/contexts/WebRtcContext";
import { useLoading } from "@/contexts/LoadingContext"; // Importing the loading context

const ChatDrawer = ({ isOpen, onClose }) => {
  const { isConnected, sendMessage, messages } = useWebRtc();
  const { setLoading } = useLoading(); // Loading context
  const [texts, setTexts] = useState([]); // State to store downloadable file objects
  const [message, setMessage] = useState(""); // State to store the message

  useEffect(() => {
    const fetchTexts = async () => {
      if (isOpen && messages.length > 0) {
        setLoading(true);
        const fetchedTexts = []; // Temporary array to hold the fetched file URLs
        
        for (const message of messages) {
          console.log("message:", message);
          if (JSON.parse(message.data).type !== "text") continue; // Skip messages that are not files
          const messageSender = message.sender;
          const messageText = JSON.parse(message.data).text;
          fetchedTexts.push({sender: messageSender, text: messageText});
        }

        setTexts(fetchedTexts); // Set the state with the fetched file URLs
        setLoading(false);
      } else {
        console.log("no texts");
        setTexts([]); // Clear files if no messages
      }
    };

    fetchTexts();
  }, [isOpen, messages, setLoading]);

  const handleSend = async () => {
    if (message) {
      console.log("sending message:", message);
      sendMessage(JSON.stringify({ type: "text", text: message }));
      setMessage("");
    }
  };

  return (
    <Drawer size="md" isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent
        bg="skyBlue"
      >
        <DrawerCloseButton />
        <DrawerHeader>Peer-to-Peer Chat</DrawerHeader>

        <DrawerBody>
          {isConnected ? (
          <VStack spacing={5}>
          <Alert color="black" status='info'>
            <AlertIcon />
            Chats are only kept here while the session is active.
          </Alert>
          <VStack align="start" w="100%" p={4} bg="white" borderRadius="md" minHeight="200px" maxHeight="500px" overflowY="auto">
            {texts.map((msg, index) => (
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
          ) : (
          <Box>
            <Text>Please connect to a device to start chatting.</Text>
          </Box>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Button color="white" variant="outline" mr={3} onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default ChatDrawer;