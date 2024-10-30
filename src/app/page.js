/* Main page for skyShare.
Description: This page displays the home page for skyShare where files can be dropped and a QR code is created. 
Programmers: Brynn Hare, Micah Borghese, Katelyn Accola, Nora Manolescu, Kyle Johnson
Date Created: 10/22/2024
*/
"use client";
import { Box, Heading, Button, Card, useBreakpointValue } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import FileUploadModal from "@/components/FileUploadModal";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { useDisclosure } from "@chakra-ui/react";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Responsive font sizes and margins
  const headingSize = useBreakpointValue({ base: "3xl", md: "5xl", lg: "7xl" });
  const margin = useBreakpointValue({ base: 4, md: 6, lg: 10 });
  const buttonFontSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  const cardWidth = useBreakpointValue({ base: "90%", md: "70%", lg: "50%" });
  const qrCodeSize = useBreakpointValue({ base: 100, md: 150, lg: 200 });

  return (
    <Box align="center" padding={margin}>
      <NavBar />
      
      {/* adjusted heading */}
      <Heading 
        fontSize={headingSize} 
        m={margin} 
        mt={8} // increased top margin to separate from NavBar
        textAlign="center"
      >
        Welcome to skyShare!
      </Heading>

      <Card m={margin} p={margin} width={cardWidth}>
        <Button
          colorScheme="blue"
          onClick={onOpen}
          width="100%"
          fontSize={buttonFontSize}
        >
          Upload File
        </Button>

        <Box mt={4} align="center">
          <QRCodeGenerator link="https://www.google.com" size={qrCodeSize} />
        </Box>
      </Card>

      <FileUploadModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Home;
