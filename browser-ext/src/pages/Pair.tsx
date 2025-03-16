"use client";
import React from "react";
import { Box, VStack, HStack, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext";
import { useWebRtc } from "../contexts/WebRtcContext";
import PairBox from "../components/pair/PairBox.jsx";

const Landing = () => {
  const { setIsLoading } = useLoading();
  const { isConnected } = useWebRtc();
  const navigate = useNavigate();

  const goShare = async () => {
    navigate("/files");
  };

  return (
    <VStack
      spacing={4}
      p={4}
      alignItems="stretch"
      h="100vh"
    >
      {/* Notes Title */}
      <Heading fontSize="xl" fontWeight="bold" textAlign="center" mb={6}>
        Pair
      </Heading>
      <Box bg="sunnyYellow.100" p={4} borderRadius="lg" boxShadow="md" w="100%" h="100%">
        <HStack w="100%" h="100%" justifyContent="space-between" alignItems="center">
          {/* Left Section (QR Code and Pair ID) */}
          <Box w="50%" display="flex" justifyContent="center" alignItems="center">
            <PairBox />
          </Box>

          {/* Right Section (Share and Not Connected buttons) */}
          <VStack w="50%" spacing={6} alignItems="center" justify="center">
            <Button onClick={goShare}>Share</Button>
            <Button
              bg={isConnected ? "green.500" : "gray.500"}
              _hover={{ bg: isConnected ? "green.600" : "gray.600", cursor: "help" }}
            >
              {isConnected ? "Connected" : "Not Connected"}
            </Button>
          </VStack>
        </HStack>
      </Box>
    </VStack>
  );
};

export default Landing;