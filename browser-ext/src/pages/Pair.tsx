"use client";
import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Button,
  Text,
  Input,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { useWebRtc } from "../contexts/WebRtcContext";
import PairBox from "../components/pair/PairBox.jsx";

const Landing = () => {
  const toast = useToast();
  const { isConnected, connectDevice } = useWebRtc();
  const [pairIdInput, setPairIdInput] = useState("");
  const [connecting, setConnecting] = useState(false);

  const handleConnectToPeer = async () => {
    const trimmedId = pairIdInput.trim();

    if (!trimmedId) {
      toast({
        title: "Invalid Pair ID",
        description: "Please enter a valid pair ID",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setConnecting(true);
    try {
      await connectDevice(trimmedId);
      toast({
        title: "Connected!",
        description: "Successfully connected to peer.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Connection Failed",
        description: "Could not connect to the peer ID.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("WebRTC Connection Error:", err);
    } finally {
      setConnecting(false);
      setPairIdInput(""); // reset textbox to original state
    }
  };

  return (
    <VStack spacing={4} p={4} alignItems="stretch" h="100vh">
      <Heading fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
        Pair
      </Heading>

      <Box bg="sunnyYellow.100" p={4} borderRadius="lg" boxShadow="md" w="100%" h="70vh">
        <HStack w="100%" h="100%" justifyContent="space-between" alignItems="center">
          <Box w="50%" display="flex" justifyContent="center" alignItems="center">
            <PairBox />
          </Box>

          <VStack w="50%" spacing={3} alignItems="center" justify="center">
            <FormControl>
              <Input
                placeholder="Enter Pair ID"
                value={pairIdInput}
                onChange={(e) => setPairIdInput(e.target.value)}
                size="sm"
                bg="white"
                color="black" // Fix text visibility issue
                mb={2}
              />
            </FormControl>

            <Button
              size="xs"
              onClick={handleConnectToPeer}
              colorScheme="blue"
              isLoading={connecting}
              isDisabled={isConnected || connecting}
            >
              Connect
            </Button>


            <Text fontSize="xs" color="gray.500" textAlign="center" mt={2}>
              If you're connecting via mobile, visit{" "}
              <a
                href="https://skyshare.technology"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>skyshare.technology</strong>
              </a>.
            </Text>
          </VStack>
        </HStack>
      </Box>
    </VStack>
  );
};

export default Landing;
