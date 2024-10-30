"use client";
import {Heading, Card, Box, useBreakpointValue} from "@chakra-ui/react";

import React from "react";
import NavBar from "@/components/NavBar";
import { useDisclosure } from "@chakra-ui/react";

function About() {
    const cardWidth = useBreakpointValue({ base: "100%", md: "85%" });
    const cardHeight = useBreakpointValue({ base: "300px", md: "400px", lg: "500px" });
    const headingSize = useBreakpointValue({ base: "3xl", md: "5xl", lg: "7xl" });
    const margin = useBreakpointValue({ base: 4, md: 6 });

    return (
        <div>
            <NavBar />
            <Box textAlign="center" mt={8}> {/* Center the text and add top margin */}
            <Heading fontSize={headingSize} m={margin} mt={8} textAlign="center">
        About skyShare
      </Heading>
                <Card 
                    bg="sunnyYellow.100" 
                    p={6} 
                    width={cardWidth} 
                    height={cardHeight} 
                    mx="auto" // Center the card horizontally
                >
                    {/* Content inside the card */}
                    blah blah for now
                </Card>
            </Box>
        </div>
    );
}

export default About;