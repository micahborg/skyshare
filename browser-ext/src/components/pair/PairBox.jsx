"use client";
import React, { useEffect } from "react";
import { Text, Box, Spinner } from "@chakra-ui/react";
import { useWebRtc } from "../../contexts/WebRtcContext";
import { useLoading } from "../../contexts/LoadingContext";
import QRCodeGenerator from "./QRCodeGenerator";

const PairBox = () => {
    const { beginPair, pairId } = useWebRtc();
    const { setIsLoading } = useLoading();

    useEffect(() => {
        console.log("Pair ID: ", pairId);
        const handlePairing = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate a 1-second delay
                await beginPair();
            } catch (error) {
                console.log("Error pairing devices: ", error);
            }
        }; 

        if (!pairId) {
            console.log("pairId is null");
            setIsLoading(true);
            handlePairing();
            setIsLoading(false);
        }
    }, [pairId]);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
            {pairId ? (
                <>
                    <Box mb={4} display="flex" justifyContent="center">
                        <QRCodeGenerator data={JSON.stringify({ pairId })} />
                    </Box>
                    <Text textColor="black" mt={4}>Pair ID: {pairId}</Text>
                </>
            ) : (
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="skyBlue"
                    size="xl"
                />
            )}
        </Box>
    );
}

export default PairBox;