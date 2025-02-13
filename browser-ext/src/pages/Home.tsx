import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ClickableCard from "../components/ClickableCard";
import theme from "../theme";

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Define actions for each card
  const openDispute = () => {
    navigate("/home");
  };

  const openHistory = () => {
    navigate("/home");
  };

  const openRegister = () => {
    navigate("/");
  };

  return (
    <Box
      p={4}
      width={theme.views.default.width}
      height={theme.views.default.height}
      flexDirection="column"
      justifyContent="center" // center the content vertically
      alignItems="center" // center the content horizontally
    >

      {/* Big Title at the Top */}
      <Text fontSize="xl" fontWeight="bold" mb={4} zIndex={1}>
        What would you like to do?
      </Text>

      {/* Register Card */}
      <ClickableCard
        cardText="Register text as IP"
        infoText="Use this option to register your details."
        onClickAction={openRegister} // Action triggered on card click
      />

      {/* View History Card */}
      <ClickableCard
        cardText="View History"
        infoText="View your transaction history here."
        onClickAction={openHistory} // Action triggered on card click
      />

      {/* Dispute Card */}
      <ClickableCard
        cardText="Raise a Dispute"
        infoText="Raise a dispute here."
        onClickAction={openDispute} // Action triggered on card click
      />
    </Box>
  );
};

export default Home;