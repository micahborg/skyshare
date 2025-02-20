import React from 'react';
import { Box, Textarea, Text, Button, VStack, HStack, Flex, Heading } from "@chakra-ui/react";
import theme from "../theme";

const Files = () => {
  return (
    <VStack
      spacing={4}
      p={4}
      alignItems="stretch"
      h="100vh"
    >
      {/* Notes Title */}
      <Heading fontSize="xl" fontWeight="bold" textAlign="center">
        Files
      </Heading>

      <HStack spacing={4} alignItems="flex-start" height="100%">
        {/* Button Section */}
        <VStack
          p={4}
          borderRadius="lg"
          boxShadow="md"
          backgroundColor="sunnyYellow.100"
          // alignItems="stretch"
          alignItems="center"
          justifyContent="center"
          h="100%"
          width = "47%"
        >
            <Button width="100%" mb={6}>Upload Files</Button>
            <Button width="100%">Share</Button>
        </VStack>

        {/* Saved Notes Section */}
        <Box
          height="100%"
          backgroundColor="sunnyYellow.100"
          borderRadius="lg"
          boxShadow="md"
          p={4}
          display="flex"
          // alignItems="center"
          justifyContent="center"
          flexGrow={1} /* Makes it take the remaining space */
          width = "50%"
        >
          <Text color="black" fontSize= "xl">Recieved Files</Text>
        </Box>

      </HStack>
    </VStack>
  );
};

export default Files;
