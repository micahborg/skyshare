"use client";
import React from "react";
import { Text, Box } from "@chakra-ui/react";
import { QRCodeSVG  } from "qrcode.react";

function QRCodeGenerator({ data }) { //generate the qr code that will be used to connect two devices
    return (
        <Box>
            {console.log(data)}
            <QRCodeSVG 
                value={data} // the URL or text the QR code should encode
                size="100px" // size of the QR code
                bgColor="#ffffff" // background color
                fgColor="#000000" // foreground color
                level="Q" // error correction level: L, M, Q, H
            />
        </Box>
    );
}

export default QRCodeGenerator;