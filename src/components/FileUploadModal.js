// components/FileUploadModal.js
"use client"; // Ensures this component runs on the client side
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, useBreakpointValue } from "@chakra-ui/react"; //importing different chakra components
import FileUpload from "@/components/FileUpload"; //importing the file upload component

const FileUploadModal = ({ isOpen, onClose }) => { 
  const size = useBreakpointValue({ base: "sm", md: "lg" }); //setting the size of the modal based on the screen size
  
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload a File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FileUpload />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FileUploadModal;
