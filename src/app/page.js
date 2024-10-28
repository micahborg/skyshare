/*Main page for skyShare.
Description: This page displays the home page for skyShare where files can be dropped and a QR code is created. 
Programmers: Brynn Hare, Micah Borghese, Katelyn Accola, Nora Manolescu, Kyle Johnson
Date Created: 10/22/2024
*/
"use client";
import { Box, Heading, Button, Card } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import FileUploadModal from "@/components/FileUploadModal";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { useDisclosure } from "@chakra-ui/react";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <Box align="center">
      <NavBar />
      <Heading fontSize="7xl" m={10}>Welcome to skyShare!</Heading>

      
      <Card m={2}> 
        <Button colorScheme="skyBlue" onClick={onOpen}>
          Upload File
        </Button>
        <QRCodeGenerator link="https://www.google.com" />
      </Card>


      <FileUploadModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Home;
