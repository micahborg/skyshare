/*File Upload component for skyShare.
Description: This handles the file uploading by displaying a box for th file to be dropped in.  
Programmers: Brynn Hare, Micah Borghese, Katelyn Accola, Nora Manolescu, Kyle Johnson
Date Created: 10/22/2024
*/
"use client";
import { useState } from 'react';
import { useIpfs } from '@/contexts/IpfsContext';
import { useLoading } from '@/contexts/LoadingContext';
import { Box, Text, useToast, VStack, Button } from '@chakra-ui/react';
import { useWebRtc } from '@/contexts/WebRtcContext';

const FileUpload = () => {
  const [isSent, setIsSent] = useState(false);
  const { isConnected, sendMessage } = useWebRtc();
  const [files, setFiles] = useState([]);
  const { uploadToIpfs } = useIpfs();
  const { setLoading } = useLoading();
  const toast = useToast();

  const handleDragOver = (event) => { //dragging over the drop box event
    event.preventDefault(); //canceling the default event from occuring
  };

  const handleFileInputChange = async (event) => {
    const newFiles = Array.from(event.target.files);
    console.log("New File: ", newFiles);
    if (newFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      for (const file of newFiles) {
        toast({
          title: "File uploaded.",
          description: `${file.name} has been uploaded successfully.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleSend = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected.",
        description: "Please select a file to upload.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!isConnected) {
      toast({
        title: "Not connected.",
        description: "Please connect to a device first.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    for (const file of files) {
      const cid = await uploadToIpfs(file);
      const message = { type: 'file', cid, name: file.name };
      const cidMessage = JSON.stringify(message);
      console.log("CID message: ", cidMessage);
      sendMessage(cidMessage);
    }
    setIsSent(true);
    setLoading(false);
    return true;
  };

  return (
    <VStack>
      {!isSent && (
      <Box
        border="2px dashed"
        borderColor="gray.300"
        borderRadius="md"
        p={4}
        textAlign="center"
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
        {files.length > 0 && (
          <Text mt={3} fontSize="md" fontWeight="medium" color="gray.600">
            Selected files: &nbsp;
          {Array.from(files).map((file, index) => (
            <span key={index}>
              {file.name}{index < files.length - 1 ? ', ' : ''}
            </span>
          ))}
          </Text>
        )}
      </Box>
      )}
      {!isSent && (
      <Button
        onClick={handleSend}
      >
        Send
      </Button>
      )}
      {isSent && (
        <VStack alignItems="center">
          <Text fontSize="lg" color="green.500">
            File sent successfully! 🎉
          </Text>
          <Text align="center" fontSize="lg" color="green.500">
            Check the Receive a File tab on the other device.
          </Text>
        </VStack>
      )}
    </VStack>
  );
};

export default FileUpload;
