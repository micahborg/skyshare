"use client";
import React, { useEffect } from "react";
import { Box, Heading, Card, Text, Flex } from "@chakra-ui/react";
import { useLoading } from "@/contexts/LoadingContext";
import NavBar from "@/components/NavBar";
import Errors from "@/components/ErrorScreen";

export default function NotFound() {
  const { setLoading } = useLoading();

  // Responsive styles
  const margin = { base: 4, md: 6 };
  const cardWidth = { base: "90%", md: "75%", lg: "60%" };
  const cardPadding = { base: 4, md: 6 };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      <NavBar />
      
      <Flex direction="column" align="center" justify="center" mt={margin} p={4}>

        <Heading size="2xl" m={margin} mt={8} textAlign="center">
          Page Not Found!
        </Heading>

        <Errors />

        {/* Responsive Card */}
        <Card
          bg="sunnyYellow.100"
          p={cardPadding}
          width={cardWidth}
          minHeight="auto"
          mx="auto"
          mb={margin}
          textAlign="center"
        >
          <Text>
            Nothing to see here! Return to your previous page by clicking the back arrow. Return to the home page or about page by clicking the buttons on the navigation bar.
          </Text>
        </Card>
      </Flex>
    </Box>
  );
}
