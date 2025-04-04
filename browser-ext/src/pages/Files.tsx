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
    }
  };

  const deleteFile = (index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
  };

  return (
    <VStack
      spacing={4}
      p={4}
      alignItems="stretch"
      h="100vh"
    >
      {/* Notes Title */}
      <Heading fontSize="xl" fontWeight="bold" textAlign="center">
        Files
      </Heading>

      <HStack spacing={4} alignItems="flex-start" height="100%">
        {/* Button Section */}
        <VStack
          p={4}
          borderRadius="lg"
          boxShadow="md"
          backgroundColor="sunnyYellow.100"
          alignItems="center"
          justifyContent="center"
          h="100%"
          width="47%"
        >
          <Input
            type="file"
            multiple
            onChange={handleFileChange}
            display="none"
            id="file-upload"
          />
          <Button
            width="100%"
            mb={6}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            Upload Files
          </Button>
            <Button 
            width="100%"
            disabled={!isConnected}
            title="You must be connected to enable file sharing"
            >
            Share
            </Button>
        </VStack>

        {/* Uploaded and Received Files Section */}
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
                >
                  <Box>
                    <Text fontSize="md">{file.name}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </Text>
                  </Box>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => deleteFile(index)}
                  >
                    Delete
                  </Button>
                </HStack>
              ))
            ) : (
              <Text color="black">No files uploaded yet.</Text>
            )}
          </VStack>

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