"use client";
import React from "react";
import { QRCodeSVG  } from "qrcode.react";

function QRCodeGenerator({ link }) { //generate the qr code that will be used to connect two devices
    return (
        <div>
            {console.log(link)}
            <QRCodeSVG 
                value={link} // the URL or text the QR code should encode
                size="200px" // size of the QR code
                bgColor="#ffffff" // background color
                fgColor="#000000" // foreground color
                level="Q" // error correction level: L, M, Q, H
            />
        </div>
    );
}

export default QRCodeGenerator;
