/* Navigation bar for skyShare.
Description: There is a navigation bar on the left of the extension so that the user can toggle between pages.  
Programmers: Brynn Hare, Micah Borghese, Katelyn Accola, Nora Manolescu, Kyle Johnson
Date Created: 2/16/2025
Modified Date: 2/16
*/
"use client";
import { Image, Flex, Heading, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

    const navigate = useNavigate();

    const goPair = async () => {
        navigate("/");
    };

    const goChat = () => {
        navigate("/chat");
    };

    const goFiles = () => {
        navigate("/files");
    };

    const goNotes = () => {
        navigate("/notes");
    };

    const goGame = () => {
        navigate("/game"); // Navigates to the Giraffe Game page
    };

    return (
        <Flex
            p={4}
            bg="sunnyYellow.100"
            color="black"
            h="100vh" // Make the navbar take up the full height
            w="25vw" // Adjust width based on screen size
            flexDirection="column" // Stack items vertically
            align="center"
            position="fixed" // Keep it fixed on the left
        >
            {/* Logo section */}
            <Flex
                flexDirection="row" // Place text and image in the same row
                align="center" // Align them properly
                justify="center"// "flex-start" // Push them towards the left
                w="100%" // Ensure it spans the full width of the navbar
                onClick={goGame} // Use skyShare logo to navigate to the game
                cursor="pointer" // Add pointer cursor indicating it's clickable
            >
                <Heading fontSize="xs" whiteSpace="nowrap">skyShare</Heading>
                <Image boxSize="20px" src="/images/giraffe_transparent_small.png" alt="skyShare logo" />
            </Flex>
            <Heading fontSize="xs" whiteSpace="nowrap">2.0</Heading>

            {/* Navigation links section */}
            <VStack my={4} spacing={4} align="center" w="100%">
                <Button
                    onClick={goPair}
                >
                    Pair
                </Button>
                <Button
                    onClick={goNotes}
                >
                    Notes
                </Button>
                <Button
                    onClick={goFiles}
                >
                    Files
                </Button>

                <Button
                    onClick={goChat}
                >
                    Chat
                </Button>
            </VStack>
        </Flex>
    );
};

export default NavBar;