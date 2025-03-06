"use client";
import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useLoading } from "../contexts/LoadingContext";

const LoadingComponent: React.FC = () => {
  const { isLoading } = useLoading(); // access the global loading state

  if (!isLoading) return null; // don't render if not loading

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      bg="rgba(255, 255, 255, 0.7)"
      zIndex="1000"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex direction="column" alignItems="center">
        {/* Loading GIF */}
        <Image
          src="/images/walking-giraffe.gif"
          alt="Loading..."
          maxW="150px"
          mb={4} 
        />
        <Text color="black" fontSize="lg">
          Loading...
        </Text>
      </Flex>
    </Box>
  );
};

export default LoadingComponent;
