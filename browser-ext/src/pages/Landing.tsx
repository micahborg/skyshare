import React from "react";
import { Box, Text, Button, Image, VStack, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import { useLoading } from "../contexts/LoadingContext";

const Landing = () => {
  const { setIsLoading } = useLoading();

  const navigate = useNavigate();

  const goHome = async () => {
    setIsLoading(true);

    // simulate a 5-second delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    navigate("/home");
  };

  const goHome2 = () => {
    navigate("/home");
  };

  return (
    <Box
      width={theme.views.default.width}
      height={theme.views.default.height}
      justifyContent="space-between"
      alignItems="center"
      p={4}
    >

      <Text fontSize="sm" color="black" textAlign="center" mb={4}>
        This is the bare bones skyShare application on the browser extension.
      </Text>

      <VStack
        width="100%"
        alignItems="center"
        justifyContent="center"
        mb={2}
      >
        <HStack
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            onClick={goHome2}
          >
            Button Example
          </Button>

          <Button
            onClick={goHome}
          >
            Go to Home
          </Button>
        </HStack>

      </VStack>
    </Box>
  );
};

export default Landing;