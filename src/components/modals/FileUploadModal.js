import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useBreakpointValue } from "@chakra-ui/react"; //importing different chakra components
import FileUpload from "@/components/FileUpload"; //importing the file upload component

const FileUploadModal = ({ isOpen, onClose }) => { 
  const size = useBreakpointValue({ base: "xs", md: "lg" }); //setting the size of the modal based on the screen size
  
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
