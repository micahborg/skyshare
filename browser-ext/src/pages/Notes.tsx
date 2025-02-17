import React from 'react';
import { Box, Textarea, Text, Button, VStack, HStack } from "@chakra-ui/react";
import theme from "../theme";

const Notes = () => {
  return (
    <VStack
      spacing={4}
      p={4}
      width={theme.views.default.width}
      height={theme.views.default.height}
      alignItems="stretch"
    >
      {/* Notes Title */}
      <Text fontSize="xl" fontWeight="bold" textAlign="center">
        Notes
      </Text>

      <HStack spacing={4} alignItems="flex-start">
        {/* Main Notes Section */}
        <VStack
          flex={2} // Adjusted to be shorter
          p={6}
          borderRadius="lg"
          boxShadow="md"
          backgroundColor={theme.colors.sunnyYellow[500]}
          alignItems="stretch"
          height="320px" // Shorter height
        >
          <Textarea
            height="220px" // Adjusted to fit new size
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
          <HStack width="100%" justifyContent="space-between" pt={2}>
            <Button colorScheme="darkYellow" flex={1}>Share</Button>
            <Button colorScheme="darkYellow" flex={1}>Save</Button>
          </HStack>
        </VStack>

        {/* Saved Notes Section */}
        <Box
          flex={2} // Increased width
          height="100%"
          backgroundColor={theme.colors.sunnyYellow[500]}
          borderRadius="lg"
          boxShadow="md"
          p={4}
        >
          <Text fontSize="lg" fontWeight="bold">Saved Notes</Text>
        </Box>
      </HStack>
    </VStack>
  );
};

export default Notes;
