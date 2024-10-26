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
