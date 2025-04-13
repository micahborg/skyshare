"use client";
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Textarea, 
  Text, 
  Button, 
  VStack, 
  HStack, 
  Flex, 
  Heading,
  Alert,
  AlertIcon,
  Input,
  Link
} from "@chakra-ui/react";
import { useWebRtc } from "../contexts/WebRtcContext";
import { useLoading } from "../contexts/LoadingContext";

const Notes = () => {
  const { isConnected, sendMessage, chats } = useWebRtc();
  const { setIsLoading } = useLoading();
  const [texts, setTexts] = useState<{ sender: string; text: string }[]>([]); // State to store downloadable file objects
  const [message, setMessage] = useState(""); // State to store the message

  useEffect(() => {
    const fetchTexts = async () => {
      if (chats.length > 0) {
        setIsLoading(true);
        const fetchedTexts = []; // Temporary array to hold the fetched file URLs
        
        for (const message of chats) {
          console.log("message:", message);
          if (JSON.parse(message.data).type !== "text") continue; // Skip messages that are not files
          const messageSender = message.sender;
          const messageText = JSON.parse(message.data).text;
          fetchedTexts.push({sender: messageSender, text: messageText});
        }

        setTexts(fetchedTexts); // Set the state with the fetched file URLs
        setIsLoading(false);
      } else {
        console.log("no texts");
        setTexts([]); // Clear files if no messages
      }
    };

    fetchTexts();
  }, [chats, setIsLoading]);

  const handleSend = async () => {
    if (message) {
      console.log("sending message:", message);
      sendMessage(JSON.stringify({ type: "text", text: message }));
      setMessage("");
    }
  };

  const handleRightClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // prevent the default context menu
    handleSend();
  };

  const linkifyText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g; // regular expression to detect URLs
    
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <Link key={index} href={part} color="blue.500" isExternal>
            {part}
          </Link>
        );
      }
      return part;
    });
  };

  return (
    <VStack
      spacing={4}
      p={4}
      h="100vh"
    >
      {/* Chat Title */}
      <Heading fontSize="xl" fontWeight="bold" textAlign="center">
        Chat
      </Heading>

      {isConnected ? (
        <VStack spacing={4} w="100%" flex={1} overflow="hidden">
          <Alert color="black" status='info'>
            <AlertIcon />
            Chats are only kept while the session is active.
          </Alert>
          <VStack flex={1} overflowY="auto" overflowX="auto" id="chatbox" align="start" w="100%" p={4} bg="white" borderRadius="md">
            {texts.map((msg, index) => (
              <Text 
                color="black" 
                key={index} 
                alignSelf={msg.sender === "local" ? "end" : "start"}
                overflowWrap="break-word"
                whiteSpace="break-word"
              >
                <strong>{msg.sender === "local" ? "You" : "Remote"}:</strong> {linkifyText(msg.text)}
              </Text>
            ))}
          </VStack>
          <HStack w="100%">
            <Input
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onContextMenu={handleRightClick} // doesn't work
            />
            <Button onClick={handleSend} disabled={!message}>Send</Button>
          </HStack>
        </VStack>
        ) : (
        <Box>
          <Text>Please connect to a device to start chatting.</Text>
        </Box>
      )}
      
    </VStack>
  );
};

export default Notes;