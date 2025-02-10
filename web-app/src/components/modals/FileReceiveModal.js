"use client"; // Ensures this component runs on the client side
import React, { useEffect, useState } from "react"; // Importing React and useState
import { Input, Box, VStack, SimpleGrid, Button, Text, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, useBreakpointValue, Divider, HStack } from "@chakra-ui/react"; // Importing different Chakra components
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
  const [receivedFileHistory, setReceivedFileHistory] = useState([]); // State to store received file history

  useEffect(() => {
    const fetchFiles = async () => {
      if (isOpen && messages.length > 0) {
        setLoading(true);
        const fetchedFiles = []; // Temporary array to hold the fetched file URLs
        
        // Get CIDs from messages, fetch files from IPFS, turn into downloadable objects
        for (const message of messages) {
          if (message.sender === "local") continue; // Skip messages sent by the current user
          if (JSON.parse(message.data).type !== "file") continue; // Skip messages that are not files
          console.log("message:", message);
          const fileCid = JSON.parse(message.data).cid;
          const fileName = JSON.parse(message.data).name;
          const fileUrl = await fetchFromIpfs(fileCid);
          const file = { fileUrl, fileName };
          fetchedFiles.push(file);
          const timestamp = Date.now();
          setFileAsCookie(fileCid, fileName, timestamp); // Add to received file history
        }

        setFiles(fetchedFiles); // Set the state with the fetched file URLs
        setLoading(false);
      } else {
        console.log("no files");
        setFiles([]); // Clear files if no messages
      }
    };

    const getReceivedFileHistory = () => {
      const cookieName = "userFiles";

      // Helper to get a cookie by name
      function getCookie(name) {
        const nameEQ = name + "=";
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return decodeURIComponent(cookie.substring(nameEQ.length));
            }
        }
        return null;
      }

      // Get the cookie value and parse it into an array
      const cookieValue = getCookie(cookieName);
      if (cookieValue) {
        try {
          const parsedCIDs = JSON.parse(cookieValue);
          if (Array.isArray(parsedCIDs)) {
              return parsedCIDs; // Return the list of CIDs
          }
        } catch (error) {
          console.error("Error parsing file history cookie:", error);
        }
      }
      return []; // Return an empty array if no cookie exists or parsing fails
    };

    // Fetch the file history and set it in state
    const history = getReceivedFileHistory();
    console.log("Received file history:", history);
    setReceivedFileHistory(history);

    fetchFiles();
  }, [isOpen, messages, fetchFromIpfs, setLoading]);

  function setFileAsCookie(cid, name, timestamp, days = 7) {
    const cookieName = "userFiles";

    // Helper to get an existing cookie by name
    function getCookie(cookieName) {
      const nameEQ = cookieName + "=";
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i].trim();
          if (cookie.indexOf(nameEQ) === 0) {
              return decodeURIComponent(cookie.substring(nameEQ.length));
          }
      }
      return null;
    }

    // Helper to set a cookie
    function setCookie(cookieName, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Expiration date
        const expires = "expires=" + date.toUTCString();
        document.cookie = `${cookieName}=${encodeURIComponent(value)}; ${expires}; path=/`;
    }

    // Get the current JSON object from the cookie, or initialize it as an empty array
    let currentData = [];
    const existingCookie = getCookie(cookieName);
    if (existingCookie) {
        try {
            currentData = JSON.parse(existingCookie);
        } catch (error) {
            console.error("Failed to parse cookie JSON:", error);
        }
    }

    // Add the new CID to the list (prevent duplicates if needed)
    if (!currentData.includes(cid)) {
        currentData.push({cid, name, timestamp});
    }

    // Save the updated JSON object back to the cookie
    setCookie(cookieName, JSON.stringify(currentData), days);
  }
  
  // const updateReceivedFileHistory = async (file) => {
  //   try {
  //     // Fetch the file content from the original URL
  //     const response = await fetch(file.fileUrl);
  
  //     if (!response.ok) {
  //       console.error("Failed to fetch file:", response.statusText);
  //       return;
  //     }
  
  //     // Open the cache
  //     const cache = await caches.open("received-files");
  
  //     // Generate a unique cache key using the file name and timestamp
  //     const cacheKey = `${window.location.origin}/cache/${file.fileName}-${Date.now()}`;
  
  //     // Create a new Request object with the generated cache key
  //     const request = new Request(cacheKey);
  
  //     // Put the response into the cache with the generated request key
  //     await cache.put(request, response.clone());
  
  //     // Add the file details to received file history
  //     const newEntry = {
  //       name: file.fileName,
  //       url: cacheKey, // Use the cache key as the URL
  //       timestamp: new Date().toISOString(),
  //     };
  
  //     const updatedHistory = [newEntry, ...receivedFileHistory];
  //     setReceivedFileHistory(updatedHistory);
  
  //     // Store the updated history in localStorage
  //     localStorage.setItem("receivedFileHistory", JSON.stringify(updatedHistory));
  
  //     console.log("File cached successfully and history updated:", updatedHistory);
  //   } catch (error) {
  //     console.error("Error updating received file history:", error);
  //   }
  // };
  

  // Function to handle file downloads
  const handleDownload = (url, name) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = name; // Use the provided file name for the download
    document.body.appendChild(a); // Append the anchor to the body
    a.click(); // Trigger the download
    document.body.removeChild(a); // Remove the anchor from the document
  };

  // Function to handle file downloads
  const handleDownloadFromHistory = async (cid, name) => {
    const url = await fetchFromIpfs(cid);
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
              <Text>No files received yet!</Text>
            )}
            <Divider mt={4} mb={4} />
            <Heading size="md" alignSelf="flex-start">
              Received File History
            </Heading>
            <Box width="100%">
              {receivedFileHistory.length > 0 ? (
                receivedFileHistory.map((entry, index) => (
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
                ))
              ) : (
                <Text fontSize="sm" color="gray.500" mt={2}>
                  No received file history yet.
                </Text>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FileReceiveModal;