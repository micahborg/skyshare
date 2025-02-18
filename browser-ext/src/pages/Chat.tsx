import React from 'react';
import { Box, Textarea, Text, Button, VStack, HStack, Flex, Heading } from "@chakra-ui/react";
import theme from "../theme";

const Notes = () => {
  return (
    <VStack
      spacing={4}
      p={4}
      alignItems="stretch"
      h="100vh"
    >
      {/* Chat Title */}
      <Heading fontSize="xl" fontWeight="bold" textAlign="center">
        Chat
      </Heading>

      <Text>Hello...</Text>
    </VStack>
  );
};

export default Notes;