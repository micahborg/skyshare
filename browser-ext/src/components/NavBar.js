/* Navigation bar for skyShare.
Description: There is a navigation bar on the left of the extension so that the user can toggle between pages.  
Programmers: Brynn Hare, Micah Borghese, Katelyn Accola, Nora Manolescu, Kyle Johnson
Date Created: 2/16/2025
Modified Date: 2/16
*/
"use client";
import { Image, Flex, Heading, VStack, Link, useBreakpointValue } from "@chakra-ui/react";

const NavBar = () => { 
    // Adjust image size based on screen size
    const imageSize = useBreakpointValue({ base: "40px", md: "50px" }); // Adjust image size for mobile

    // Adjust the font size for headers based on screen size (smaller font size for mobile)
    const headingFontSize = useBreakpointValue({
        base: "xs",  // Extra small font size on mobile for better spacing
        sm: "sm",    // Small font size for small screens
        md: "lg",    // Larger font size for medium and up
    });

    // Adjust the font size for skyShare logo section
    const logoFontSize = useBreakpointValue({
        base: "lg", // Small font size for mobile
        md: "xl",   // Larger font size for medium and up
    });

    // Adjust the gap between navigation links for mobile
    const navLinkGap = useBreakpointValue({
        base: 4,   // Smaller gap between links on mobile
        md: 6,     // Default gap on desktop
    });

    return (
        <Flex
            p={4}
            bg="sunnyYellow.100"
            color="black"
            h="100vh" // Make the navbar take up the full height
            w={{ base: "80px", md: "200px" }} // Adjust width based on screen size
            flexDirection="column" // Stack items vertically
            align="center"
            position="fixed" // Keep it fixed on the left
            left={0}
            top={0}
        >
            {/* Logo section */}
            <Flex
                flexDirection="column"
                align="center"
                mb={8} // Add space below the logo
            >
                <Heading fontSize={logoFontSize}>skyShare</Heading>
                <Image boxSize={imageSize} src="images/giraffetransparent.png" alt="skyShare logo" />
            </Flex>

            {/* Navigation links section */}
            <VStack spacing={6} align="center" w="100%">
                <Link href="/">
                    <Heading fontSize={headingFontSize}>Home</Heading>
                </Link>
                <Link href="/about">
                    <Heading fontSize={headingFontSize}>About</Heading>
                </Link>
                <Link href="/tutorial">
                    <Heading fontSize={headingFontSize}>Tutorial</Heading>
                </Link>
            </VStack>
        </Flex>
    );
};

export default NavBar;