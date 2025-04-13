"use client";
import React, { useRef, useState } from "react";
import { Box, VStack, HStack, Heading, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext";
import { useWebRtc } from "../contexts/WebRtcContext";
import PairBox from "../components/pair/PairBox.jsx";

const Landing = () => {
  const { setIsLoading } = useLoading();
  const { isConnected, sendFile } = useWebRtc();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleShareFile = async () => {
    if (selectedFile && isConnected) {
      setIsLoading(true);
      await sendFile(selectedFile);
      setIsLoading(false);
      const sharedItems = JSON.parse(localStorage.getItem("sharedItems") || "[]");
      const newSharedItems = [...sharedItems, selectedFile.name];
      localStorage.setItem("sharedItems", JSON.stringify(newSharedItems));
    } else {
      alert("Please select a file and ensure you are connected.");
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click(); // Triggers the hidden file input
  };

  return (
    <VStack spacing={4} p={4} alignItems="stretch" h="100vh">
      <Heading fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
        Pair
      </Heading>

      <Box bg="sunnyYellow.100" p={4} borderRadius="lg" boxShadow="md" w="100%" h="70vh">
        <HStack w="100%" h="100%" justifyContent="space-between" alignItems="center">
          <Box w="50%" display="flex" justifyContent="center" alignItems="center">
            <PairBox />
          </Box>

          <VStack w="50%" spacing={3} alignItems="center" justify="center">
            {/* Custom button to trigger file picker */}
            <Button
              size="xs"
              onClick={handleFileButtonClick}
            >
              Select File
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            {/* Show selected file name if exists */}
            {selectedFile && (
              <Text fontSize="sm" color="gray.700">
                Selected: {selectedFile.name}
              </Text>
            )}

            <Button 
              size="xs" 
              onClick={handleShareFile}
              disabled={!isConnected}
              title="You must be connected to enable file sharing"
            >
              Share
            </Button>
            <Text fontSize="xs" color="gray.500" textAlign="center" mt={2}>
              If you're connecting via mobile, visit <a href="https://skyshare.technology" target="_blank" rel="noopener noreferrer"><strong>skyshare.technology</strong></a>.
            </Text>
          </VStack>
        </HStack>
      </Box>
    </VStack>
  );
};

export default Landing;
