import React from 'react';
import { Box, Textarea, Text } from "@chakra-ui/react";
import theme from "../theme";

const Notes = () => {
  return (
    <Box
      p={4}
      width={theme.views.default.width}
      height={theme.views.default.height}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Notes
      </Text>
      <Textarea
        width="80%"
        height="400px"
        padding="10px"
        fontSize="16px"
        border="1px solid"
        borderColor={theme.border}
        borderRadius="5px"
        backgroundColor={theme.inputBackground}
        color={theme.inputText}
        placeholder="Write your notes here..."
        resize="none"
      />
    </Box>
  );
};

export default Notes;