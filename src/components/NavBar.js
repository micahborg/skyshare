/* Navigation bar for skyShare.
Description: There is a navigation bar at the top of the site so that the user can toggle between the about and home pages.  
Programmers: Brynn Hare, Micah Borghese, Katelyn Accola, Nora Manolescu, Kyle Johnson
Date Created: 10/22/2024
*/
import { Image, Flex, Heading, HStack, Link, useBreakpointValue } from "@chakra-ui/react";

const NavBar = () => { // creating the navigation bar at the top of the site
    // responsive font size for the headings
    const headingSize = useBreakpointValue({ base: "md", md: "lg" });

    return (
        <HStack p={4} bg="sunnyYellow.100" color="black"> 
            <Flex ml={5} gap={10} flexDirection="row" w="70%">
                <Link href="/">
                    <Heading fontSize={headingSize}>Home</Heading>
                </Link>
                <Link href="/about">
                    <Heading fontSize={headingSize}>About</Heading>
                </Link>
            </Flex>
            <Flex mr={5} w="30%" align="center" flexDirection="row-reverse">
                <Image boxSize="50px" src="images/giraffetransparent.png" alt="skyShare logo" />
                <Heading fontSize={headingSize}>skyShare</Heading>
            </Flex>
        </HStack>
    );
};

export default NavBar;
