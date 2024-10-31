"use client"; // Ensures this component runs on the client side
import React, { useEffect, useState } from "react"; //importing react and useState
import { Input, HStack, Button, Text, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, useBreakpointValue } from "@chakra-ui/react"; //importing different chakra components
import QRCodeScanner from "@/components/QRCodeScanner"; //importing the QR code scanner component
import { useLoading } from "@/contexts/LoadingContext"; //importing the loading context

const ConnectModal = ({ isOpen, onClose }) => { 
  const size = useBreakpointValue({ base: "xs", md: "lg" }); //setting the size of the modal based on the screen size
  const [ showScanner, setShowScanner ] = useState(true); //state to show the QR code scanner
  const { setLoading } = useLoading(); //loading context

  const handleScan = async (result) => {
    console.log(result);
  };
  
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay />
        <ModalContent h="70vh">
          <ModalHeader>Connect Modal</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={10} mb={10}>
          <Text 
            position="absolute" 
            zIndex="1" 
            color="white"
            bg="rgba(0, 0, 0, 0.5)"
            p={2}
            borderRadius="md"
            >
                Scan Pairing QR Code
            </Text>
            {/* QRCodeScanner */}
            <QRCodeScanner onScan={handleScan} isActive={showScanner} />
            <HStack>
                <Input variant='outline' my={5} placeholder='Enter Pair ID' />
                <Button>Connect</Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConnectModal;
