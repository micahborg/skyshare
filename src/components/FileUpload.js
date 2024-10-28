/*File Upload component for skyShare.
Description: This handles the file uploading by displaying a box for th file to be dropped in.  
Programmers: Brynn Hare, Micah Borghese, Katelyn Accola, Nora Manolescu, Kyle Johnson
Date Created: 10/22/2024
*/
"use client";
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

  const handleDragOver = (event) => { //dragging over the drop box event
    event.preventDefault(); //canceling the default event from occuring
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
      width="100%"
      maxWidth="500px"
      height="200px"
      mx="auto"
    >
      <Text fontSize="lg" mb={2}>
        Drag and drop your files here, or click to select files
      </Text>
      <input
        type="file"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
        <Text color="blue.500">Click to select files</Text>
      </label>
      
      {/* Display the file name if a file is selected */}
      {file && (
        <Text mt={3} fontSize="md" fontWeight="medium" color="gray.600">
          Selected file: {file.name}
        </Text>
      )}
    </Box>
  );
};

export default FileUpload;
