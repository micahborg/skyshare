// components/FileUpload.js
"use client"; // Ensure this is a client component
import { useState } from 'react';
import { Box, Text, useToast } from '@chakra-ui/react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const toast = useToast();

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
      toast({
        title: "File uploaded.",
        description: `${files[0].name} has been uploaded successfully.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setFile(files[0]);
      toast({
        title: "File uploaded.",
        description: `${files[0].name} has been uploaded successfully.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      border="2px dashed"
      borderColor="gray.300"
      borderRadius="md"
      p={4}
      textAlign="center"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      cursor="pointer"
      width="30%"  // Adjust the width (e.g., "100%", "400px")
      maxWidth="500px" // Optional max width to limit size on larger screens
      height="200px"   // Adjust the height (e.g., "200px", "300px")
      mx="auto" // Centers the box horizontally
    >
      <Text fontSize="lg" mb={2}>
        Drag and drop your files here, or click to select files
      </Text>
      <input
        type="file"
        onChange={handleFileInputChange}
        style={{ display: 'none' }} // Hide the default file input
        id="file-upload"
      />
      <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
        <Text color="blue.500">Click to select files</Text>
      </label>
      {file && <Text mt={2}>Selected file: {file.name}</Text>}
    </Box>
  );
};

export default FileUpload;
