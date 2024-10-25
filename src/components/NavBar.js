import { Box, Flex, Heading, HStack, Link } from "@chakra-ui/react";

const NavBar = () => {
    return (
        <HStack p={8} bg="sunnyYellow.100" color="black">
            <Flex gap={10} flexDirection="row" w="70%" align="left">
                <Link><Heading>Home</Heading></Link>
                <Link><Heading>About</Heading></Link>
            </Flex>
            <Box w="30%" align="right">
                <Heading>skyShare</Heading>
            </Box>
        </HStack>
    );
};

export default NavBar;