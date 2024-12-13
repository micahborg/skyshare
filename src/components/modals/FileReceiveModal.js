"use client"; // Ensures this component runs on the client side
import React, { useEffect, useState } from "react"; // Importing React and useState
import { Input, Box, VStack, SimpleGrid, Button, Text, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, useBreakpointValue, Divider, HStack } from "@chakra-ui/react"; // Importing different Chakra components
import { useWebRtc } from "@/contexts/WebRtcContext";
//import { useIpfs } from "@/contexts/IpfsContext";
import { useLoading } from "@/contexts/LoadingContext"; // Importing the loading context
import { FaFile, FaFileImage } from 'react-icons/fa'; // Importing file icons

const FileReceiveModal = ({ isOpen, onClose }) => { 
  const size = useBreakpointValue({ base: "xs", md: "lg" }); // Setting the size of the modal based on the screen size
  const { files } = useWebRtc(); // WebRTC context
  const { setLoading } = useLoading(); // Loading context
  const [fetchedFiles, setFetchedFiles] = useState([]); // State to store downloadable file objects
  //const [receivedFileHistory, setReceivedFileHistory] = useState([]); // State to store received file history

  useEffect(() => {
    const fetchFiles = async () => {
      if (isOpen && files.length > 0) {
        setLoading(true);
        for (const file of files) {
          if (file.sender === "local") continue; // Skip messages sent by the current user
          console.log("file:", file);
          //const fileObject = file.data;
          const fileName = file.fileName;
          const fileUrl = file.data; //URL.createObjectURL(fileObject); //await fetchFromIpfs(fileCid);
          const fileData = { fileUrl, fileName };
          setFetchedFiles((prevFiles) => [...prevFiles, fileData]);
          //const timestamp = Date.now();
          //setFileAsCookie(fileUrl, fileName, timestamp); // Add to received file history
        }
        setLoading(false);
      } else {
        console.log("no files");
        setFetchedFiles([]); // Clear files if no messages
      }
    };

    // const getReceivedFileHistory = () => {
    //   const cookieName = "userFiles";

    //   // Helper to get a cookie by name
    //   function getCookie(name) {
    //     const nameEQ = name + "=";
    //     const cookies = document.cookie.split(';');
    //     for (let i = 0; i < cookies.length; i++) {
    //         let cookie = cookies[i].trim();
    //         if (cookie.indexOf(nameEQ) === 0) {
    //             return decodeURIComponent(cookie.substring(nameEQ.length));
    //         }
    //     }
    //     return null;
    //   }

    //   // Get the cookie value and parse it into an array
    //   const cookieValue = getCookie(cookieName);
    //   if (cookieValue) {
    //     try {
    //       const parsedFiles = JSON.parse(cookieValue);
    //       if (Array.isArray(parsedFiles)) {
    //           return parsedFiles; // Return the list of file objects
    //       }
    //     } catch (error) {
    //       console.error("Error parsing file history cookie:", error);
    //     }
    //   }
    //   return []; // Return an empty array if no cookie exists or parsing fails
    // };

    // // Fetch the file history and set it in state
    // const history = getReceivedFileHistory();
    // console.log("Received file history:", history);
    // setReceivedFileHistory(history);

    fetchFiles();
  }, [isOpen, setLoading]);

  // function setFileAsCookie(fileUrl, name, timestamp, days = 7) {
  //   const cookieName = "userFiles";

  //   // Helper to get an existing cookie by name
  //   function getCookie(cookieName) {
  //     const nameEQ = cookieName + "=";
  //     const cookies = document.cookie.split(';');
  //     for (let i = 0; i < cookies.length; i++) {
  //         let cookie = cookies[i].trim();
  //         if (cookie.indexOf(nameEQ) === 0) {
  //             return decodeURIComponent(cookie.substring(nameEQ.length));
  //         }
  //     }
  //     return null;
  //   }

  //   // Helper to set a cookie
  //   function setCookie(cookieName, value, days) {
  //       const date = new Date();
  //       date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Expiration date
  //       const expires = "expires=" + date.toUTCString();
  //       document.cookie = `${cookieName}=${encodeURIComponent(value)}; ${expires}; path=/`;
  //   }

  //   // Get the current JSON object from the cookie, or initialize it as an empty array
  //   let currentData = [];
  //   const existingCookie = getCookie(cookieName);
  //   if (existingCookie) {
  //       try {
  //           currentData = JSON.parse(existingCookie);
  //       } catch (error) {
  //           console.error("Failed to parse cookie JSON:", error);
  //       }
  //   }

  //   if (!currentData.includes(fileUrl)) {
  //       currentData.push({fileUrl, name, timestamp});
  //   }

  //   // Save the updated JSON object back to the cookie
  //   setCookie(cookieName, JSON.stringify(currentData), days);
  // }
  

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
  function isImageFile(url) {
    console.log("url:", url);
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
            {fetchedFiles.length > 0 ? (
              <Box>
                <VStack width="100%" spacing={2}>
                  {/* Map over files and display download buttons */}
                  {fetchedFiles.map((file, index) => (
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
              <Text>No files received yet!</Text>
            )}
            {/* <Divider mt={4} mb={4} />
            {receivedFileHistory.length > 0 ? (
              <>
              <Heading size="md" alignSelf="flex-start">
                Received File History
              </Heading>
              <Box width="100%">
                  {receivedFileHistory.map((entry, index) => (
                    <HStack
                      key={index}
                      justifyContent="space-between"
                      p={3}
                      borderWidth={1}
                      borderColor="gray.300"
                      borderRadius="md"
                      mb={2}
                    > 
                      <Text fontSize="md">
                        📥 {entry.name}
                      </Text>
                      <Button variant="link" onClick={async () => handleDownloadFromHistory(entry.url, entry.name)}>
                        Download
                      </Button>
                      <Text fontSize="sm" color="gray.500">
                        {new Date(entry.timestamp).toLocaleString()}
                      </Text>
                    </HStack>
                  ))}
              </Box>
              </>
            ) : ( null )} */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FileReceiveModal;