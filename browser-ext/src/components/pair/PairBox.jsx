"use client";
import React, { useEffect } from "react";
import { Text, Box } from "@chakra-ui/react";
import { useWebRtc } from "../../contexts/WebRtcContext";
import { useLoading } from "../../contexts/LoadingContext";
import QRCodeGenerator from "./QRCodeGenerator";

const PairBox = () => {
    const { beginPair, pairId } = useWebRtc();
    const { setLoading } = useLoading();

    useEffect(() => {
        console.log("Pair ID: ", pairId);
        const handlePairing = async () => {
        try {
            await beginPair();
        } catch (error) {
            console.log("Error pairing devices: ", error);
        }
        }; 

        if (!pairId) {
            setLoading(true);
            handlePairing();
            setLoading(false);
        }
    }, [pairId]);

    return (
        <Box>
            {pairId && (
                <><QRCodeGenerator data={pairId} /><Text>Pair ID: {pairId}</Text></>
            )}
        </Box>
    );
}

export default PairBox;