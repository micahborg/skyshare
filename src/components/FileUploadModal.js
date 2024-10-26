// components/FileUploadModal.js
"use client"; // Ensures this component runs on the client side
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import FileUpload from "@/components/FileUpload";

const FileUploadModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
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
