/*Not found page for skyShare.
Description: This page will appear when any page other than the home or about pages are accessed.   
Programmers:Brynn Hare
Date Created: 11/17/2024
Edit Dates: 11/18 
*/

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
      {/* Main content */}
      <Flex direction="column" align="center" justify="center" mt={margin} p={4}>
        {/* Large Heading */}
        <Heading size="2xl" m={margin} mt={8} textAlign="center">
          Page Not Found!
        </Heading>

        <Errors />

        {/* Responsive Card */}
        <Card
          bg="sunnyYellow.100"
          p={cardPadding}
          width={cardWidth}
          minHeight="auto" // Flexible height based on content
          mx="auto"
          mb={margin}
          textAlign="center"
        >
          <Text>
            Nothing to see here! Return to your previous page by clicking the
            back arrow, or use the navigation bar to visit the Home or About
            pages.
          </Text>
        </Card>
      </Flex>
    </Box>
  );
}
