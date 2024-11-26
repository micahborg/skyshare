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
import FileUploadModal from "@/components/modals/FileUploadModal";
import FileReceiveModal from "@/components/modals/FileReceiveModal";
import PairModal from "@/components/modals/PairModal";
import ConnectModal from "@/components/modals/ConnectModal";
import ChatDrawer from "@/components/drawers/ChatDrawer";
import { useDisclosure } from "@chakra-ui/react";
import { useLoading } from "@/contexts/LoadingContext";
import { useWebRtc } from "@/contexts/WebRtcContext";

const Home = () => {
  const { isOpen: isUploadOpen, onOpen: onUploadOpen, onClose: onUploadClose } = useDisclosure();
  const { isOpen: isReceiveOpen, onOpen: onReceiveOpen, onClose: onReceiveClose } = useDisclosure();
  const { isOpen: isPairModalOpen, onOpen: onPairOpen, onClose: onPairClose } = useDisclosure();
  const { isOpen: isConnectModalOpen, onOpen: onConnectOpen, onClose: onConnectClose } = useDisclosure();
  const { isOpen: isChatOpen, onOpen: onChatOpen, onClose: onChatClose } = useDisclosure();
  const { isConnected } = useWebRtc();
  const { setLoading } = useLoading();

  // Responsive settings
  const margin = useBreakpointValue({ base: 4, md: 6 });
  const cardWidth = useBreakpointValue({ base: "70%", md: "55%", lg: "25%" });
  const cardHeight = useBreakpointValue({ base: "300px", md: "500px", lg: "500px" });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
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
            <VStack spacing={6} width="100%">
              <Button
                onClick={onPairOpen} // this button generates a pair ID and corresponding QR code
              >
                Start Pairing
              </Button>
              <Button
                onClick={onConnectOpen} // this button opens the QR code scanner and prompts the user to scan or enter a pair ID
              >
                Connect to a Pair
              </Button>
              <Button
                bg={isConnected ? "green.500" : "gray.500"}
                _hover={{ bg: isConnected ? "green.600" : "gray.600", cursor: "help" }}
              >
                {isConnected ? "Connected" : "Not Connected"}
              </Button>
            </VStack>
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
                Send a File
              </Button>
              <Button
                onClick={onReceiveOpen}
                width="auto"
              >
                Receive a File
              </Button>
              <Button
                onClick={onChatOpen}
                width="auto"
              >
                Send a Chat
              </Button>
            </VStack>
          </Flex>
        </Card>
      </Flex>

      {/* Modals */}
      <FileReceiveModal isOpen={isReceiveOpen} onClose={onReceiveClose} />
      <PairModal isOpen={isPairModalOpen} onClose={onPairClose} />
      <ConnectModal isOpen={isConnectModalOpen} onClose={onConnectClose} />
      <FileUploadModal isOpen={isUploadOpen} onClose={onUploadClose} />
      <ChatDrawer isOpen={isChatOpen} onClose={onChatClose} />
    </Box>  
  );
};

export default Home;
