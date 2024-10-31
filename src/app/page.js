"use client";
import React, { useEffect } from "react";
import {
  Box,
  Heading,
  Button,
  Card,
  Flex,
  VStack,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import FileUploadModal from "@/components/FileUploadModal";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { useDisclosure } from "@chakra-ui/react";
import { useLoading } from "@/contexts/LoadingContext";

const Home = () => {
  const { isOpen: isUploadOpen, onOpen: onUploadOpen, onClose: onUploadClose } = useDisclosure();
  const { isOpen: isQRModalOpen, onOpen: onQROpen, onClose: onQRClose } = useDisclosure();
  const { setLoading } = useLoading();

  // Responsive settings
  const margin = useBreakpointValue({ base: 4, md: 6 });
  const cardWidth = useBreakpointValue({ base: "70%", md: "55%", lg: "25%" });
  const cardHeight = useBreakpointValue({ base: "300px", md: "500px", lg: "500px" });
  const qrCodeSize = useBreakpointValue({ base: 100, md: 150, lg: 200 });

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Box align="center">
      <NavBar />

      {/* Main heading */}
      <Heading size="2xl" m={margin} mt={8} textAlign="center">
        Welcome to skyShare!
      </Heading>

      {/* Flex container for two cards side by side */}
      <Flex justify="center" gap={50} mt={8} wrap="wrap">
        {/* Left Card - Pair Devices */}
        <Card
          bg="sunnyYellow.100"
          p={6}
          width={cardWidth}
          height={cardHeight}
          align="center"
        >
          <Heading fontSize="2xl" mb={4}>
            Pair Devices
          </Heading>
          <Flex direction="column" align="center" justify="center" height="100%">
            <Button
              onClick={onQROpen}
            >
              Open QR Code
            </Button>
          </Flex>
        </Card>

        {/* Right Card - Share Files */}
        <Card
          bg="sunnyYellow.100"
          p={6}
          width={cardWidth}
          height={cardHeight}
        >
          <Heading fontSize="2xl" mb={4}>
            Share Files
          </Heading>
          <Flex direction="column" align="center" justify="center" height="100%">
            <VStack spacing={6} width="100%"> {/* Increased spacing */}
              <Button
                onClick={onUploadOpen}
                width="auto"
              >
                Click here to send a file
              </Button>
              <Button
                width="auto"
              >
                Click here to receive a file
              </Button>
            </VStack>
          </Flex>
        </Card>
      </Flex>

      {/* QR Code Modal */}
      <Modal isOpen={isQRModalOpen} onClose={onQRClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>QR Code</ModalHeader>
          <ModalCloseButton />
          <ModalBody align="center" py={6}>
            <QRCodeGenerator link="https://www.google.com" size={qrCodeSize} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* File upload modal */}
      <FileUploadModal isOpen={isUploadOpen} onClose={onUploadClose} />
    </Box>
  );
};

export default Home;
