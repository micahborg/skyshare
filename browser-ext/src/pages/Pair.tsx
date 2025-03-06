import React from "react";
import { Box, Flex, Text, VStack, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext";
import PairBox from "../components/pair/PairBox.jsx";

const Landing = () => {
  const { setIsLoading } = useLoading();

  const navigate = useNavigate();

  const goShare = async () => {
    setIsLoading(true);

    // simulate a 5-second delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
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
      <Text fontSize="sm" textAlign="center" mb={4}>
        This is the bare bones skyShare application on the browser extension.
      </Text>
      <Button onClick={goShare}>Share</Button>
      <PairBox />
    </VStack>
  );
};

export default Landing;