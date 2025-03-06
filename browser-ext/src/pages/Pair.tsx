"use client";
import React from "react";
import { Box, Flex, Text, VStack, Heading, Button } from "@chakra-ui/react";
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
      <Heading fontSize="xl" fontWeight="bold" textAlign="center">
        Pair
      </Heading>
      <Button onClick={goShare}>Share</Button>
      <PairBox />
      <Button
        bg={isConnected ? "green.500" : "gray.500"}
        _hover={{ bg: isConnected ? "green.600" : "gray.600", cursor: "help" }}
      >
        {isConnected ? "Connected" : "Not Connected"}
      </Button>
    </VStack>
  );
};

export default Landing;