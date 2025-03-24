/* Connection Button for skyShare.
Description: There is a button on the upper right of each page to show if skyshare is connected or not.  
Programmers: Brynn Hare, Micah Borghese, Katelyn Accola, Nora Manolescu, Kyle Johnson
Date Created: 3/24/2025
Modified Date: 3/24
*/

"use client";
import { Image, Box, Flex, Heading, VStack, Link, useBreakpointValue, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext";
import { useWebRtc } from "../contexts/WebRtcContext";

const Paired = () => {
    const { isConnected } = useWebRtc();


    return (
        <Box 
            position="fixed"
            top="0.5rem"  // Keeps some padding from the top edge
            right="0.5rem" // Keeps some padding from the right edge
            zIndex="1000" // Ensures it stays on top of other elements
        >
            <Button
              size="xs" // Smallest predefined button size
              fontSize="0.7rem" // Makes text smaller
              p="0.3rem 0.5rem" // Reduces padding for a compact button
              bg={isConnected ? "green.500" : "gray.500"}
              _hover={{ bg: isConnected ? "green.600" : "gray.600", cursor: "help" }}
            >
              {isConnected ? "Connected" : "Not Connected"}
            </Button>
        </Box>
    );
};

export default Paired;