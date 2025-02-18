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
      {/* Notes Title */}
      <Heading fontSize="xl" fontWeight="bold" textAlign="center">
        Notes
      </Heading>

      <HStack spacing={4} alignItems="flex-start" height="100%">
        {/* Main Notes Section */}
        <VStack
          p={4}
          borderRadius="lg"
          boxShadow="md"
          backgroundColor="sunnyYellow.100"
          alignItems="stretch"
          h="100%"
        >
          <Textarea
            flexGrow={1}
            padding="10px"
            fontSize="16px"
            border="1px solid"
            borderColor={theme.border}
            borderRadius="5px"
            backgroundColor="darkYellow"
            color={theme.inputText}
            placeholder="Write your notes here..."
            resize="none"
          />
          <HStack width="100%" justifyContent="space-between">
            <Button>Share</Button>
            <Button>Save</Button>
          </HStack>
        </VStack>

        {/* Saved Notes Section */}
        <Box
          height="100%"
          backgroundColor="sunnyYellow.100"
          borderRadius="lg"
          boxShadow="md"
          p={4}
        >
          <Text color="black">Saved Notes</Text>
        </Box>

      </HStack>
    </VStack>
  );
};

export default Notes;
