import React from 'react';
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
  Input
} from "@chakra-ui/react";
import theme from "../theme";

const Notes = () => {
  const isConnected = true;
  const [message, setMessage] = React.useState("");
  const [texts, setTexts] = React.useState([ { sender: "local", text: "Hello!" }, { sender: "remote", text: "Hi!" }, { sender: "remote", text: "rthfhfh" }, { sender: "remote", text: "fgrth64ghfbgfb" }, { sender: "local", text: "oh no..." }, { sender: "local", text: "dvgggggggg" } ]);
  //const [texts, setTexts] = React.useState([ { sender: "local", text: "Hello!" }, { sender: "remote", text: "Hi!" } ]);

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
            Chats are only kept here while the session is active.
          </Alert>
          <VStack flex={1} overflowY="auto" id="chatbox" align="start" w="100%" p={4} bg="white" borderRadius="md">
            {texts.map((msg, index) => (
              <Text color="black" key={index} alignSelf={msg.sender === "local" ? "end" : "start"}>
                <strong>{msg.sender === "local" ? "You" : "Remote"}:</strong> {msg.text}
              </Text>
            ))}
          </VStack>
          <HStack w="100%">
            <Input
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button disabled={!message}>Send</Button>
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