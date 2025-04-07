"use client";
import React, { useState } from 'react';
import { Box, Text, Button, VStack, HStack, Heading, Input } from "@chakra-ui/react";
import { useWebRtc } from '../contexts/WebRtcContext'; 

const Files = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { isConnected } = useWebRtc(); // Use the WebRTC hook

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUploadedFiles(Array.from(event.target.files));
      setSelectedIndex(0); // Auto-select the first uploaded file
    }
  };

  const deleteFile = (index: number) => {
    setUploadedFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (selectedIndex === index) {
        setSelectedIndex(null);
      } else if (selectedIndex !== null && index < selectedIndex) {
        setSelectedIndex(selectedIndex - 1);
      }
      return updated;
    });
  };

  const handleShareSelectedFile = () => {
    if (!isConnected) return alert("Not connected");
    if (selectedIndex === null) return alert("No file selected");
    sendFile(uploadedFiles[selectedIndex]);
  };

  const deleteReceivedFile = (index: number) => {
    setReceivedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (webrtcFiles && webrtcFiles.length > 0) {
      const fetchedFiles: ReceivedFile[] = (webrtcFiles as File[]).map(
        (file: File) => ({
          fileUrl: URL.createObjectURL(file),
          fileName: file.name,
          fileObj: file,
        })
      );
      setReceivedFiles(fetchedFiles);
    }
  }, [webrtcFiles]);

  return (
    <VStack spacing={4} p={4} alignItems="stretch" h="100vh">
      <Heading fontSize="xl" fontWeight="bold" textAlign="center">
        Files
      </Heading>

      <HStack spacing={4} alignItems="flex-start" height="100%">
        {/* Upload & Share Section */}
        <VStack
          p={4}
          borderRadius="lg"
          boxShadow="md"
          backgroundColor="sunnyYellow.100"
          alignItems="center"
          justifyContent="flex-start"
          h="100%"
          width="47%"
          spacing={4}
        >
          <Input
            type="file"
            multiple
            onChange={handleFileChange}
            display="none"
            id="file-upload"
          />
          <Button width="100%" onClick={() => document.getElementById("file-upload")?.click()}>
            Upload Files
          </Button>
          <Button
            width="100%"
            colorScheme="blue"
            onClick={handleShareSelectedFile}
            isDisabled={selectedIndex === null}
          >
            Share
          </Button>
            <Button 
            width="100%"
            disabled={!isConnected}
            title="You must be connected to enable file sharing"
            >
            Share
            </Button>
        </VStack>

        {/* Uploaded & Received Files */}
        <Box
          height="100%"
          backgroundColor="sunnyYellow.100"
          borderRadius="lg"
          boxShadow="md"
          p={4}
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          flexGrow={1}
          width="50%"
        >
          {/* Uploaded Files */}
          <VStack align="start" spacing={2} mb={4}>
            <Text fontWeight="bold" mb="2px" color="black" whiteSpace="nowrap">Uploaded Files</Text>
            {uploadedFiles.length > 0 ? (
              uploadedFiles.map((file, index) => (
                <HStack
                  key={index}
                  p={2}
                  borderWidth={1}
                  borderRadius="md"
                  width="100%"
                  justifyContent="space-between"
                  bg={selectedIndex === index ? "blue.100" : "white"}
                  onClick={() => setSelectedIndex(index)}
                  cursor="pointer"
                >
                  <Box>
                    <Text fontSize="md">{file.name}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </Text>
                  </Box>
                  <IconButton
                    aria-label="Delete file"
                    icon={<DeleteIcon />}
                    size="xs"
                    colorScheme="red"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent selection on delete
                      deleteFile(index);
                    }}
                  />
                </HStack>
              ))
            ) : (
              <Text color="black">No files uploaded yet.</Text>
            )}
          </VStack>

          {/* Received Files */}
          <VStack align="start" spacing={2}>
            <Text fontWeight="bold" mb="2px" color="black" whiteSpace="nowrap">Received Files</Text>
            {/* Add logic to display received files here */}
            <Text color="black">No received files yet.</Text>
          </VStack>
        </Box>
      </HStack>
    </VStack>
  );
};

export default Files;
