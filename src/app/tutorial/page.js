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

    // Steps for File Transfer
    const fileTransferSteps = [
        {
            stepTitle: "Ensure Devices are Connected",
            description: "Make sure both devices are connected and paired via skyShare.",
            image: "/images/mobile_connected.png" // Example image for device connection
        },
        {
            stepTitle: "On Device 1:",
            description: "Click Send a File. A pop-up will appear to upload files.",
            image: "/images/mobile_upload.png" // Image showing the 'Send a File' option on Device 1
        },
        {
            stepTitle: "Upload Files:",
            description: "Select and upload the files you want to send. Once done, click Send.",
            image: "/images/mobile_select.png" // Image showing file upload interface
        },
        {
            stepTitle: "Confirmation:",
            description: "A screen will confirm that your files were sent.",
            image: "/images/mobile_sent.png" // Image showing confirmation of file sent
        },
        {
            stepTitle: "On Device 2:",
            description: "Click Receive a File. You’ll see the received files, including the file upload history!",
            image: "/images/mobile_received.png" // Image showing the 'Receive a File' option on Device 2
        }
    ];

    // Steps for Using the Chat
    const chatSteps = [
        {
            stepTitle: "Sending a Chat",
            description: "It’s simple and fun! Once they're connected, just click the Send a Chat button to send messages between Device 1 and Device 2!",
            image: "/images/desktop_chat.png" // Optional image showing the 'Send a Chat' button or chat interface
        }
    ];

    const steps = [
        {
            step_num: "How to Pair Devices",
            pairingSteps: pairingSteps // The steps for pairing devices
        },
        {
            step_num: "How to Transfer a File",
            fileTransferSteps: fileTransferSteps // The steps for file transfer
        },
        {
            step_num: "How to Use the Chat",
            chatSteps: chatSteps // The steps for using the chat
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

                            {/* How to Pair Devices */}
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
                                            alignItems="center"
                                        >
                                            <Text fontSize="lg" fontWeight="bold" textAlign="center">{pairingStep.stepTitle}</Text>
                                            <Text fontSize="md" mt={2} textAlign="center">{pairingStep.description}</Text>
                                            {pairingStep.image && (
                                                <Image
                                                    src={pairingStep.image}
                                                    alt={`Step ${pairingIndex + 1} Image`}
                                                    width={{ base: "70%", md: "60%" }}  // Adjust width for uniform size
                                                    objectFit="contain"
                                                    borderRadius="md"
                                                    mt={4}
                                                    boxShadow="lg"
                                                    mx="auto" // Center the image horizontally
                                                />
                                            )}
                                        </Box>
                                    ))}
                                </Flex>
                            ) : step.step_num === "How to Transfer a File" ? (
                                // How to Transfer a File steps
                                <Flex direction={{ base: "column", md: "row" }} align="center" gap={6} wrap="wrap" justify="center">
                                    {step.fileTransferSteps.map((fileTransferStep, fileIndex) => (
                                        <Box 
                                            key={fileIndex} 
                                            textAlign="left" 
                                            mt={6} 
                                            width={{ base: "100%", md: "48%" }} 
                                            mx="auto"
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                        >
                                            <Text fontSize="lg" fontWeight="bold" textAlign="center">{fileTransferStep.stepTitle}</Text>
                                            <Text fontSize="md" mt={2} textAlign="center">{fileTransferStep.description}</Text>
                                            {fileTransferStep.image && (
                                                <Image
                                                    src={fileTransferStep.image}
                                                    alt={`Step ${fileIndex + 1} Image`}
                                                    width={{ base: "70%", md: "60%" }}  // Same width for uniform size
                                                    objectFit="contain"
                                                    borderRadius="md"
                                                    mt={4}
                                                    boxShadow="lg"
                                                    mx="auto" // Center the image horizontally
                                                />
                                            )}
                                        </Box>
                                    ))}
                                </Flex>
                            ) : step.step_num === "How to Use the Chat" ? (
                                // How to Use Chat step
                                <Box textAlign="center" mt={10}>
                                    <Text fontSize="lg" fontWeight="bold">{step.chatSteps[0].stepTitle}</Text>
                                    <Text fontSize="md" mt={2}>{step.chatSteps[0].description}</Text>
                                    {step.chatSteps[0].image && (
                                        <Image
                                            src={step.chatSteps[0].image}
                                            alt="How to Use Chat"
                                            width={{ base: "70%", md: "60%" }}  // Same width for uniform size
                                            objectFit="contain"
                                            borderRadius="md"
                                            mt={4}
                                            boxShadow="lg"
                                            mx="auto" // Center the image horizontally
                                        />
                                    )}
                                </Box>
                            ) : (
                                // For other steps
                                <Box textAlign="center" mt={10}>
                                    <Image 
                                        src={step.image}
                                        alt={`Image for ${step.step_num}`}
                                        width={{ base: "70%", md: "60%" }}  // Same width for uniform size
                                        objectFit="contain"
                                        borderRadius="md"
                                        boxShadow="lg"
                                        mx="auto" // Center the image horizontally
                                    />
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
