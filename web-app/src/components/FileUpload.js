import { useState, useEffect } from "react";
import { useLoading } from "@/contexts/LoadingContext";
import { Box, Text, useToast, VStack, Button, Divider, HStack, Heading } from "@chakra-ui/react";
import { useWebRtc } from "@/contexts/WebRtcContext";
import confetti from "canvas-confetti";

const FileUpload = () => {
  const [isSent, setIsSent] = useState(false);
  const { isConnected, sendFile, sendMessage } = useWebRtc();
  const [files, setFiles] = useState([]);
  //const [fileHistory, setFileHistory] = useState([]);
  const { setLoading } = useLoading();
  const toast = useToast();

  const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500 MB in bytes

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files);
    handleFiles(newFiles);
  };

  const handleFileInputChange = (event) => {
    const newFiles = Array.from(event.target.files);
    handleFiles(newFiles);
  };

  const handleFiles = (newFiles) => {
    const oversizedFiles = newFiles.filter((file) => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      oversizedFiles.forEach((file) => {
        toast({
          title: "File too large.",
          description: `${file.name} exceeds the 500MB limit. Please select a smaller file.`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
      return;
    }
    if (newFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      newFiles.forEach((file) => {
        toast({
          title: "File uploaded.",
          description: `${file.name} has been uploaded successfully.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      });
    }
  };

  const triggerConfetti = () => {
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 20,
      spread: 360,
      ticks: 60,
      zIndex: 1000,
      scalar: 5, // Size scaling for the particles
    };
  
    const emoji1 = '🌿'; // Use an emoji as the confetti shape
    const emojiShape1 = confetti.shapeFromText(emoji1); // Create confetti shape from emoji

    const emoji2 = '🍃'; // Use an emoji as the confetti shape
    const emojiShape2 = confetti.shapeFromText(emoji2); // Create confetti shape from emoji

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
      const particleCount = 80 * (timeLeft / duration); // Gradually reduce particles over time
  
  
      confetti({
        ...defaults,
        particleCount,
        shapes: [emojiShape1, emojiShape2], // Set the emoji shape
        origin: {
          x: Math.random(), // Random horizontal position
          y: Math.random() * 0.5, // Confetti starts in the upper half
        },

        particleCount: 80 * (timeLeft / duration),
        origin: { x: Math.random(), y: Math.random() - 0.2 },
      });
    }, 250);
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
      console.log("Uploading file:", file);
      await sendFile(file);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    setIsSent(true);
    setLoading(false);
  };

  return (
    <VStack spacing={4} width="100%" maxWidth="600px" mx="auto">
      {!isSent && (
        <>
          <Box
            border="2px dashed"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
            textAlign="center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            cursor="pointer"
            width="100%"
            height="200px"
          >
            <Text fontSize="lg" mb={2}>
              Drag and drop your files here, or click to select files
            </Text>
            <input
              type="file"
              onChange={handleFileInputChange}
              style={{ display: "none" }}
              id="file-upload"
            />
            <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
              <Text color="blue.500">Click to select files</Text>
            </label>
            {files.length > 0 && (
              <Text mt={3} fontSize="md" fontWeight="medium" color="gray.600">
                Selected files:{" "}
                {files.map((file, index) => (
                  <span key={index}>
                    {file.name}
                    {index < files.length - 1 ? ", " : ""}
                  </span>
                ))}
              </Text>
            )}
          </Box>
          <Button onClick={handleSend}>Send</Button>
        </>
      )}
      {isSent && (
        <VStack alignItems="center">
          {(() => {
            triggerConfetti();
            return null;
          })()}
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