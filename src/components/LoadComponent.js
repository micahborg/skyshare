/*Load Icon for skyShare.
Description: This displays a moving giraffe anytime there is something on the site that needs to load.  
Programmers: Brynn Hare, Micah Borghese
Date Created: 10/29/2024
*/
"use client";
import React from "react"; //import the react module
import { Box, Flex, Image, Text } from "@chakra-ui/react"; //import the box, flex, image, and text components from chakra ui
import { useLoading } from '@/contexts/LoadingContext'; //import the useLoading component from the loading context
import { motion } from 'framer-motion'; //import the motion component from framer-motion

const MotionBox = motion.create(Box);


const Load = () => { //create the load component
    const { loading } = useLoading(); // Access the global loading state

    if (!loading) return null; // Don't render if not loading

    return (
        <MotionBox
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        bg="rgba(255, 255, 255, 0.5)"
        zIndex="10000"
        display="flex"
        justifyContent="center"
        alignItems="center"
        initial={{ opacity: 1 }}
        animate={{ opacity: loading ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        pointerEvents={loading ? "auto" : "none"} // Prevent clicks during fade-out
        >
            <Flex direction="column" alignItems="center">
                <Image
                src="images/transparentgiraffegif.gif"
                alt="Loading..."
                maxW="225px"
                mb={4} 
                />
                <Text color="black" fontSize="lg">
                    Loading...
                </Text>
            </Flex>
        </MotionBox>
    )
};

export default Load;