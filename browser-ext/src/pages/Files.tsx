"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Heading,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { useWebRtc } from "../contexts/WebRtcContext";
import { DeleteIcon, DownloadIcon } from "@chakra-ui/icons";
import Confetti from "react-confetti";

interface ReceivedFile {
  fileUrl: string;
  fileName: string;
  fileObj: File;
}

const Files = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [receivedFiles, setReceivedFiles] = useState<ReceivedFile[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiTimeout = useRef<NodeJS.Timeout | null>(null);

  const { isConnected, sendFile, files: webrtcFiles } = useWebRtc();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setUploadedFiles(files);
      setSelectedIndex(0);
    }
  };

  const deleteFile = (index: number) => {
    setUploadedFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (selectedIndex === index) setSelectedIndex(null);
      else if (selectedIndex !== null && index < selectedIndex)
        setSelectedIndex(selectedIndex - 1);
      return updated;
    });
  };

  const handleShareSelectedFile = async () => {
    if (!isConnected) return alert("Not connected");
    if (selectedIndex === null) return alert("No file selected");
    try {
      // assume sendFile returns a Promise
      await sendFile(uploadedFiles[selectedIndex]);
      // trigger confetti
      setShowConfetti(true);
      // clear any existing timer
      if (confettiTimeout.current) clearTimeout(confettiTimeout.current);
      // stop confetti after 3s
      confettiTimeout.current = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    } catch (err) {
      console.error("File share failed", err);
      alert("Failed to share file");
    }
  };

  const deleteReceivedFile = (index: number) => {
    setReceivedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (webrtcFiles && webrtcFiles.length > 0) {
      const newFiles: ReceivedFile[] = (webrtcFiles as File[]).map((file) => ({
        fileUrl: URL.createObjectURL(file),
        fileName: file.name,
        fileObj: file,
      }));
      setReceivedFiles(newFiles);
    }
  }, [webrtcFiles]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (confettiTimeout.current) clearTimeout(confettiTimeout.current);
    };
  }, []);

  return (
    <VStack spacing={4} p={4} alignItems="stretch" h="100vh">
      {showConfetti && (
        <Confetti
          // full-screen
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}

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
          <Button
            width="100%"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            Upload Files
          </Button>
          <Button
            width="100%"
            onClick={handleShareSelectedFile}
            disabled={!isConnected || selectedIndex === null}
            title={
              !isConnected
                ? "You must be connected to share files"
                : "Select a file to share"
            }
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
          {/* Uploaded Files */}
          <VStack align="start" spacing={2} mb={4}>
            <Text fontWeight="bold" mb="2px" color="black" whiteSpace="nowrap">
              Uploaded Files
            </Text>
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
                    <Text fontSize="sm">{file.name}</Text>
                  </Box>
                  <IconButton
                    aria-label="Delete"
                    icon={<DeleteIcon />}
                    size="xs"
                    colorScheme="red"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
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
            <Text fontWeight="bold" mb="2px" color="black" whiteSpace="nowrap">
              Received Files
            </Text>
            {receivedFiles.length > 0 ? (
              receivedFiles.map((file, index) => (
                <HStack
                  key={index}
                  p={2}
                  borderWidth={1}
                  borderRadius="md"
                  width="100%"
                  justifyContent="space-between"
                  bg="blue.100"
                >
                  <Box>
                    <Text fontSize="xs">{file.fileName}</Text>
                  </Box>
                  <HStack spacing={2}>
                    <IconButton
                      as="a"
                      href={file.fileUrl}
                      download={file.fileName}
                      aria-label="Download file"
                      icon={<DownloadIcon />}
                      size="xs"
                      colorScheme="green"
                      variant="ghost"
                    />
                    <IconButton
                      aria-label="Delete file"
                      icon={<DeleteIcon />}
                      size="xs"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => deleteReceivedFile(index)}
                    />
                  </HStack>
                </HStack>
              ))
            ) : (
              <Text color="black">No received files yet.</Text>
            )}
          </VStack>
        </Box>
      </HStack>
    </VStack>
  );
};

export default Files;
