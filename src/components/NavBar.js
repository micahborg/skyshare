import { Image, Flex, Heading, HStack, Link } from "@chakra-ui/react";

const NavBar = () => {
    return (
        <HStack p={7} bg="sunnyYellow.100" color="black">
            <Flex ml={5} gap={10} flexDirection="row" w="70%">
                <Link href="/"><Heading>Home</Heading></Link>
                <Link href="/about"><Heading>About</Heading></Link>
            </Flex>
            <Flex mr={5} w="30%" align="center" flexDirection="row-reverse">
                <Image boxSize="60px" src="images/giraffetransparent.png" alt="skyShare logo" />
                <Heading>skyShare</Heading>
            </Flex>
        </HStack>
    );
};

export default NavBar;