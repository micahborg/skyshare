import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import { useLoading } from "../contexts/LoadingContext";
import NavBar from "../components/NavBar";

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

  const goNotes = () => {
    navigate("/notes");
  };

  return (
    <Flex>
      <Text fontSize="sm" color="black" textAlign="center" mb={4}>
        This is the bare bones skyShare application on the browser extension.
      </Text>
    </Flex>
  );
};

export default Landing;