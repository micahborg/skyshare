// components/FileUploadModal.js
"use client"; // Ensures this component runs on the client side
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import FileUpload from "@/components/FileUpload";

const FileUploadModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Button to trigger the modal */}
      <Button colorScheme="sunnyYellow.100" onClick={onOpen}>
        Upload File
      </Button>

      {/* Modal that contains the FileUpload component */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Your File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FileUpload />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="sunnyYellow.100" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FileUploadModal;
