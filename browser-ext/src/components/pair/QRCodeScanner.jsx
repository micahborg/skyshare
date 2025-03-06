"use client";
import React, { useRef, useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";
import QrScanner from "qr-scanner"; // Import qr-scanner library

const QRCodeScanner = ({ onScan, isActive, onClose }) => {
  const videoRef = useRef(null); // Reference for video element
  const qrScannerRef = useRef(null); // Reference for QrScanner instance

  useEffect(() => {
    if (isActive && videoRef.current) {
      qrScannerRef.current = new QrScanner(videoRef.current, (result) => {
        onScan(result); // Call the callback function when a QR code is scanned
      });
      qrScannerRef.current.start(); // Start scanning
    }

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop(); // Cleanup on component unmount
        qrScannerRef.current = null;
      }
    };
  }, [isActive, onScan]);

  if (!isActive) return null;

  return (
    <Box
        position="relative"
        width="100%"
        height="100%"
        overflow="hidden"
    >
    <video
        ref={videoRef}
        width="100%"
        height="100%"
        style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            height: "100%",
        }}
    />
    <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
    >
        <Image src="images/qr-frame.svg" alt="QR Frame" width={156} height={156} />
    </Box>
    </Box>

  );
};

export default QRCodeScanner;
