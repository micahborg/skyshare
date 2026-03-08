"use client";
import { Button, Text, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, useBreakpointValue } from "@chakra-ui/react"; //importing different chakra components
import { useWebRtc } from "@/contexts/WebRtcContext";
import { useLoading } from "@/contexts/LoadingContext";
import { useEffect } from "react";
import QRCodeGenerator from "../QRCodeGenerator";

const PairModal = ({ isOpen, onClose }) => { 
  const size = useBreakpointValue({ base: "xs", md: "lg" });
  const { beginPair, pairId } = useWebRtc();
  const { setLoading } = useLoading();

  useEffect(() => {
    const handlePairing = async () => {
      try {
        await beginPair();
      } catch (error) {
        console.log("Error pairing devices: ", error);
      }
    }; 

    if (isOpen) {
      setLoading(true);
      handlePairing();
      setLoading(false);
    }
  }, [isOpen]);

  
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Start Pairing</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {pairId && (
            <VStack>
              <Text>Pair ID: {pairId}</Text>
              <QRCodeGenerator data={JSON.stringify({ pairId })} />
              <Button onClick={onClose}>
                Start Sharing!
              </Button>
            </VStack>
          )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PairModal;
