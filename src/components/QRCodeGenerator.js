/*QR Code Generator for skyShare.
Description: A QR code is generated to connect and link two devices. 
Programmers: Brynn Hare, Micah Borghese, Katelyn Accola, Nora Manolescu, Kyle Johnson
Date Created: 10/22/2024
*/
"use client";
import React from "react";
import { QRCodeSVG  } from "qrcode.react";

function QRCodeGenerator({ data }) { //generate the qr code that will be used to connect two devices
    return (
        <div>
            {console.log(data)}
            <QRCodeSVG 
                value={data} // the URL or text the QR code should encode
                size="200px" // size of the QR code
                bgColor="#ffffff" // background color
                fgColor="#000000" // foreground color
                level="Q" // error correction level: L, M, Q, H
            />
        </div>
    );
}

export default QRCodeGenerator;
