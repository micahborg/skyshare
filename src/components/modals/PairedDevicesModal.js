"use client"; // Ensures this component runs on the client side
import React, { useEffect, useState } from "react"; //importing react and useState
import { Input, Box, HStack, SimpleGrid, Button, Text, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, useBreakpointValue } from "@chakra-ui/react"; //importing different chakra components
import { useLoading } from "@/contexts/LoadingContext"; //importing the loading context

const PairedDevices = ({ isOpen, onClose }) => { 
  const size = useBreakpointValue({ base: "xs", md: "lg" }); //setting the size of the modal based on the screen size
  const [ showScanner, setShowScanner ] = useState(true); //state to show the QR code scanner
  const { setLoading } = useLoading(); //loading context
  
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay />
        <ModalContent h="70vh">
          <ModalHeader>Paired Devices</ModalHeader>
          <ModalCloseButton />
          <ModalBody width="100%" pb={10} mb={6} overflow="hidden">
          <Box height="92%">
            <SimpleGrid width="100%" columns={[2, null, 3]} spacing={2}>
                <Box bg='tomato' height='80px'>
                    <Text>Device 1</Text>
                </Box>
                <Box bg='tomato' height='80px'>
                    <Text>Device 2</Text>
                </Box>
                <Box bg='tomato' height='80px'>
                    <Text>Device 3</Text>
                </Box>
                <Box bg='tomato' height='80px'>
                    <Text>Device 4</Text>
                </Box>
                <Box bg='tomato' height='80px'>
                    <Text>Device 5</Text>
                </Box>
            </SimpleGrid>
          </Box>
            <HStack justifyContent="center">
                <Button width="50%">Connect New Device</Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PairedDevices;
