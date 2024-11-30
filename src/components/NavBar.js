/* Navigation bar for skyShare.
Description: There is a navigation bar at the top of the site so that the user can toggle between the about and home pages.  
Programmers: Brynn Hare, Micah Borghese, Katelyn Accola, Nora Manolescu, Kyle Johnson
Date Created: 10/22/2024
Modified Date: 11/29
*/
"use client";
import { Image, Flex, Heading, HStack, Link, useBreakpointValue } from "@chakra-ui/react";

const NavBar = () => {
    // Adjust layout based on screen size
    const flexDirection = useBreakpointValue({ base: "column", md: "row" }); // Stack vertically on mobile
    const imageSize = useBreakpointValue({ base: "40px", md: "50px" }); // Adjust image size for mobile

    return (
        <HStack p={4} bg="sunnyYellow.100" color="black" align="center" justify="space-between">
            {/* Navigation links section */}
            <Flex ml={5} gap={10} flexDirection={flexDirection} w="70%" justify="flex-start">
                <Link href="/">
                    <Heading size="md">Home</Heading>
                </Link>
                <Link href="/about">
                    <Heading size="md">About</Heading>
                </Link>
                <Link href="/tutorial">
                    <Heading size="md">Tutorial</Heading>
                </Link>
            </Flex>
            {/* Logo section */}
            <Flex mr={5} w="30%" align="center" flexDirection="row-reverse" justify="flex-start">
                <Image boxSize={imageSize} src="images/giraffetransparent.png" alt="skyShare logo" />
                <Heading size="lg">skyShare</Heading>
            </Flex>
        </HStack>
    );
};

export default NavBar;
