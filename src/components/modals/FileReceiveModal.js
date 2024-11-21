"use client"; // Ensures this component runs on the client side
import React, { useEffect, useState } from "react"; // Importing React and useState
import { Input, Box, VStack, SimpleGrid, Button, Text, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, useBreakpointValue } from "@chakra-ui/react"; // Importing different Chakra components
import { useWebRtc } from "@/contexts/WebRtcContext";
import { useIpfs } from "@/contexts/IpfsContext";
import { useLoading } from "@/contexts/LoadingContext"; // Importing the loading context
import { FaFile, FaFileImage } from 'react-icons/fa'; // Importing file icons

const FileReceiveModal = ({ isOpen, onClose }) => { 
  const size = useBreakpointValue({ base: "xs", md: "lg" }); // Setting the size of the modal based on the screen size
  const { messages } = useWebRtc(); // WebRTC context
  const { fetchFromIpfs } = useIpfs(); // IPFS context
  const { setLoading } = useLoading(); // Loading context
  const [files, setFiles] = useState([]); // State to store downloadable file objects

  useEffect(() => {
    const fetchFiles = async () => {
      if (isOpen && messages.length > 0) {
        setLoading(true);
        const fetchedFiles = []; // Temporary array to hold the fetched file URLs
        
        // Get CIDs from messages, fetch files from IPFS, turn into downloadable objects
        for (const message of messages) {
          if (message.sender === "local") continue; // Skip messages sent by the current user
          console.log("message:", message);
          const fileCid = JSON.parse(message.text).cid;
          const fileName = JSON.parse(message.text).name;
          const fileUrl = await fetchFromIpfs(fileCid);
          fetchedFiles.push({fileUrl: fileUrl, fileName: fileName});
        }

        setFiles(fetchedFiles); // Set the state with the fetched file URLs
        setLoading(false);
      } else {
        console.log("no messages");
        setFiles([]); // Clear files if no messages
      }
    };

    fetchFiles();
  }, [isOpen, messages, fetchFromIpfs, setLoading]);
  
  // Function to handle file downloads
  const handleDownload = (url, name) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = name; // Use the provided file name for the download
    document.body.appendChild(a); // Append the anchor to the body
    a.click(); // Trigger the download
    document.body.removeChild(a); // Remove the anchor from the document
  };

  // Utility function to check if the file is an image
  const isImageFile = (url) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'];
    return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay />
        <ModalContent h="70vh">
          <ModalHeader>Received Files</ModalHeader>
          <ModalCloseButton />
          <ModalBody align="center" width="100%" pb={10} mb={6} overflow="hidden">
          {files.length > 0 ? (
            <Box>
              <VStack width="100%" spacing={2}>
                {/* Map over files and display download buttons */}
                {files.map((file, index) => (
                  <Box key={index} width="100%">
                    <Button 
                      variant="light"
                      onClick={() => handleDownload(file.fileUrl, file.fileName)}
                      display="flex" // Use flex to align icon/image and text
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      {isImageFile(file.fileName) ? (
                        <img src={file.fileUrl} alt={file.fileUrl.split('/').pop()} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', marginRight: '8px' }} />
                      ) : (
                        <FaFile style={{ marginRight: '8px' }} />
                      )}
                      <Text>{file.fileName}</Text>
                    </Button>
                  </Box>
                ))}
              </VStack>
            </Box>
            ) : (
                <Text>No files received yet yet!</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FileReceiveModal;
