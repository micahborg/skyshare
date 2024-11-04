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
  const [file, setFile] = useState(null);
  const { uploadToIpfs } = useIpfs();
  const { setLoading } = useLoading();
  const toast = useToast();

  const handleDragOver = (event) => { //dragging over the drop box event
    event.preventDefault(); //canceling the default event from occuring
  };

  const handleFileInputChange = async (event) => {
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

  const handleSend = async () => {
    if (file === null) {
      toast({
        title: "No file selected.",
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
    const cid = await uploadToIpfs(file);
    const message = { type: 'file', cid, name: file.name };
    const cidMessage = JSON.stringify(message);
    console.log("CID message: ", cidMessage);
    sendMessage(cidMessage);
    setIsSent(true);
    setLoading(false);
    return cid;
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
        {file && (
          <Text mt={3} fontSize="md" fontWeight="medium" color="gray.600">
            Selected file: {file.name}
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
