/* Navigation bar for skyShare.
Description: There is a navigation bar on the left of the extension so that the user can toggle between pages.  
Programmers: Brynn Hare, Micah Borghese, Katelyn Accola, Nora Manolescu, Kyle Johnson
Date Created: 2/16/2025
Modified Date: 2/16
*/
"use client";
import { Image, Flex, Heading, HStack, Link, useBreakpointValue } from "@chakra-ui/react";

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
        <HStack p={4} bg="sunnyYellow.100" color="black" align="center" justify="space-between" spacing={4}>
            {/* Navigation links section */}
            <Flex
                gap={navLinkGap} // Reduced gap between links on mobile
                flexDirection="row" // Keep links in a row on both mobile and desktop
                w={{ base: "auto", md: "70%" }} // On mobile, take only necessary width, on desktop take 70%
                justify="flex-start" // Align links to the left
                align="center"
                wrap="nowrap" // Prevent wrapping on mobile so they are still in one line
            >
                <Link href="/">
                    <Heading fontSize={headingFontSize}>Home</Heading>
                </Link>
                <Link href="/about">
                    <Heading fontSize={headingFontSize}>About</Heading>
                </Link>
                <Link href="/tutorial">
                    <Heading fontSize={headingFontSize}>Tutorial</Heading>
                </Link>
            </Flex>

            {/* Logo section */}
            <Flex
                gap={0} // Smaller gap between logo and text like in Canva design 
                w="auto"
                justify="flex-end" // Align the logo to the right on both mobile and desktop
                align="center"
                flexDirection="row" // Align logo (image) to the right of the text
            >
                <Heading fontSize={logoFontSize}>skyShare</Heading>
                <Image boxSize={imageSize} src="images/giraffetransparent.png" alt="skyShare logo" />
            </Flex>
        </HStack>
    );
};

export default NavBar;