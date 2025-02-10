"use client"; // Ensures this component runs on the client side
import React, { useEffect, useState } from "react"; //importing react and useState
import { Input, Box, HStack, Button, Text, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, useBreakpointValue } from "@chakra-ui/react"; //importing different chakra components
import QRCodeScanner from "@/components/QRCodeScanner"; //importing the QR code scanner component
import { useLoading } from "@/contexts/LoadingContext"; //importing the loading context
import { useWebRtc } from "@/contexts/WebRtcContext"; //importing the webRTC context

const ConnectModal = ({ isOpen, onClose }) => { 
  const size = useBreakpointValue({ base: "xs", md: "lg" }); //setting the size of the modal based on the screen size
  const { connectDevice, isConnected, pairId } = useWebRtc(); //webRTC context
  const [ showScanner, setShowScanner ] = useState(true); //state to show the QR code scanner
  const { setLoading } = useLoading(); //loading context
  const [inputValue, setInputValue] = useState(""); //state to store the input value

  const handlePair = async (result) => {
    if (isConnected) return;
    setLoading(true);
    console.log(result);
    try {
      const data = JSON.parse(result).pairId;
      const response = await connectDevice(data); // Join using the scanned pair ID
      setShowScanner(false);
      setLoading(false);
    } catch (error) {
      console.log("Invalid QR code:", error);
      setLoading(false);
      return;
    }
  };
  
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay />
        <ModalContent h="70vh">
          <ModalHeader>Connect to a Device</ModalHeader>
          <ModalCloseButton />
          {!isConnected && (
          <ModalBody pb={10} mb={6} overflow="hidden">
          <Box height="92%">
            <Text 
              position="absolute" 
              zIndex="1" 
              color="white"
              bg="rgba(0, 0, 0, 0.5)"
              p={2}
              borderRadius="full"
              >
                  Scan Pairing QR Code
              </Text>
              {/* QRCodeScanner */}
              <QRCodeScanner onScan={handlePair} isActive={showScanner} />
            </Box>
            <HStack>
                <Input 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  variant='outline' 
                  my={5} 
                  placeholder='Enter Pair ID' />
                <Button
                  onClick={() => handlePair(JSON.stringify({ pairId: inputValue }))}
                >
                  Connect
                </Button>
            </HStack>
          </ModalBody>
          )}
          {pairId && isConnected && (
            <ModalBody>
              <Text fontSize="lg" color="green.500">Connected to Device</Text>
              <Text fontSize="lg" color="green.500">Pair ID: {pairId}</Text>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConnectModal;
