"use client"; // Ensures this component runs on the client side
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, useBreakpointValue } from "@chakra-ui/react"; //importing different chakra components

const PairModal = ({ isOpen, onClose }) => { 
  const size = useBreakpointValue({ base: "xs", md: "lg" }); //setting the size of the modal based on the screen size
  
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pair Modal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Hello
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PairModal;
