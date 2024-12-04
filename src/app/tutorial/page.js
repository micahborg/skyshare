/*Tutorial page for skyShare.
Description: This page has a tutorial on how to use skyShare. 
Programmers: Micah Borghese, Katelyn Accola, Brynn Hare, Nora Manolescu, and Kyle Johnson
Date Created: 11/25/2024
Edit Dates: 11/29
*/

"use client";
import React, { useEffect } from "react";
import { Heading, Card, Box, useBreakpointValue, Flex, Image, Text } from "@chakra-ui/react";
import { useLoading } from "@/contexts/LoadingContext";
import NavBar from "@/components/NavBar";

function Tutorials() {
    const cardWidth = useBreakpointValue({ base: "100%", md: "85%" });
    const headingSize = useBreakpointValue({ base: "3xl", md: "5xl", lg: "7xl" });
    const margin = useBreakpointValue({ base: 4, md: 6 });
    const { setLoading } = useLoading();

    // Steps for Pairing Devices
    const pairingSteps = [
        {
            stepTitle: "On Device 1:",
            description: "Click Start Pairing. A QR code will appear.",
            image: "/images/mobileqr.png" // Optional image for the step
        },
        {
            stepTitle: "On Device 2:",
            description: "Click Connect. This will open the camera.",
            image: "/images/mobile_camera.png" // Optional image for the step
        },
        {
            stepTitle: "Scan QR Code:",
            description: (
                <>
                    Use Device 2’s camera to scan the QR code from Device 1.
                    <br />
                    Once paired, the connection status button will update.
                </>
            ),
            image: "/images/mobile_connected.png" // Optional image for the combined step
        }
    ];

    const steps = [
        {
            step_num: "How to Pair Devices",
            pairingSteps: pairingSteps // The steps will now be passed here
        },
        {
            step_num: "Transferring a File",
            image: "/images/testimonial1.jpg",
            caption: "File Transfer Process"
        },
        {
            step_num: "Using the Chat",
            image: "/images/testimonial3.jpg",
            caption: "Chat Feature"
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
                        key={index}
                    >
                        <Flex direction="column" width="100%" align="center" height="auto">
                            {/* Step Title */}
                            <Box textAlign="center" mb={4}>
                                <Heading as="h3" size="md">
                                    {step.step_num}
                                </Heading>
                            </Box>

                            {/* Pairing Devices - Display text-based steps */}
                            {step.step_num === "How to Pair Devices" ? (
                                <Flex direction={{ base: "column", md: "row" }} align="center" gap={6} wrap="wrap" justify="center">
                                    {step.pairingSteps.map((pairingStep, pairingIndex) => (
                                        <Box 
                                            key={pairingIndex} 
                                            textAlign="left" 
                                            mt={6} 
                                            width={{ base: "100%", md: "48%" }} 
                                            mx="auto"
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center" // Center the content horizontally
                                        >
                                            <Text fontSize="lg" fontWeight="bold" textAlign="center">{pairingStep.stepTitle}</Text>
                                            <Text fontSize="md" mt={2} textAlign="center">{pairingStep.description}</Text>
                                            {pairingStep.image && (
                                                <Image
                                                    src={pairingStep.image}
                                                    alt={`Step ${pairingIndex + 1} Image`}
                                                    width={{ base: "70%", md: "60%" }}  // Reduce width but keep aspect ratio intact
                                                    objectFit="contain"
                                                    borderRadius="md"
                                                    mt={4}
                                                    boxShadow="lg"  // Add shadow effect
                                                    mx="auto" // Center the image horizontally
                                                />
                                            )}
                                        </Box>
                                    ))}
                                </Flex>
                            ) : (
                                // For other steps (Transferring a File, Using the Chat)
                                <Box textAlign="center" mt={10}>
                                    <Image 
                                        src={step.image}
                                        alt={`Image for ${step.step_num}`}
                                        width={{ base: "70%", md: "60%" }}  // Reduce width but keep aspect ratio intact
                                        objectFit="contain"
                                        borderRadius="md"
                                        boxShadow="lg"  // Add shadow effect
                                        mx="auto" // Center the image horizontally
                                    />
                                    {/* Caption for the single image */}
                                    <Text fontSize="sm" mt={4}>{step.caption}</Text>
                                </Box>
                            )}
                        </Flex>
                    </Card>
                ))}
            </Box>
        </div>
    );
}

export default Tutorials;


