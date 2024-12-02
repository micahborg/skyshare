/*Tutorial page for skyShare.
Description: This page has a tutorial on how to use skyShare. 
Programmers: Micah Borghese, Katelyn Accola, Brynn Hare, Nora Manolescu, and Kyle Johnson
Date Created: 11/25/2024
Edit Dates: 11/29
*/

"use client";
import React, { useEffect, useState } from "react";
import { Link, Heading, Card, Box, useBreakpointValue, Flex, Image, Text } from "@chakra-ui/react";
import { useLoading } from "@/contexts/LoadingContext";
import NavBar from "@/components/NavBar";
import { useDisclosure } from "@chakra-ui/react";

function Tutorials() {
    const cardWidth = useBreakpointValue({ base: "100%", md: "85%" });
    const headingSize = useBreakpointValue({ base: "3xl", md: "5xl", lg: "7xl" });
    const margin = useBreakpointValue({ base: 4, md: 6 });
    const { setLoading } = useLoading();

    const steps = [
        {
            step_num: "Pairing Devices",
            image: "/images/giraffetransparent.png",
            text: "instructions"
        },
        {
            step_num: "Transferring a File",
            image: "/images/testimonial1.jpg",
            text: "instructions"
        },
        {
            step_num: "Using the Chat",
            image: "/images/testimonial3.jpg",
            text: "instructions"
        }
    ];

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <div>
            <NavBar />
            <Box textAlign="center" mt={8}>
                <Heading fontSize={headingSize} m={margin} mt={8} textAlign="center">
                    How to Use skyShare
                </Heading>           

                {steps.map((step, index) => (
                <Card 
                    bg="sunnyYellow.100" 
                    p={9} 
                    width="100%"
                    mx="auto" 
                    mb={6}
                    key={index} // Always include a unique `key` when mapping
                >
                    <Flex direction="column" width="100%" align="center" height="auto">
                    {/* Left: Image */}
                    <Box textAlign="center">
                        <Heading as="h3" size="md" mb={2}>
                        {step.step_num} {/* Use `step.name` */}
                        </Heading>
                    </Box>
                    <Box flexShrink={0} mr={{ base: 0, md: 4 }} mb={{ base: 4, md: 0 }}>
                        <Image 
                        src={step.image} // Use `step.image`
                        alt="Image of the skyShare step" 
                        boxSize={{ base: "100px", md: "100px", lg: "150px" }} 
                        objectFit="cover" 
                        borderRadius="md" 
                        align="center"
                        />
                    </Box> 

                    {/* Right: Text */}
                    <Box textAlign="center">
                        <Text fontSize="sm">
                        {step.text} {/* Use `step.text` */}
                        </Text>
                    </Box>
                    </Flex>
                </Card>
                ))}

            </Box>
        </div>
    );
}


export default Tutorials;