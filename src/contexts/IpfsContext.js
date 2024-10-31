/* everything IPFS */

"use client";
import React, { createContext, useContext } from 'react';
const IpfsContext = createContext();

export const IpfsProvider = ({children}) =>{

  async function uploadToIpfs(file) {
    const formData = new FormData();
    formData.append('file', file); 
    console.log('Uploading file to IPFS...');
    try {
        const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PINATA_JWT}`
            },
            body: formData
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const resData = await res.json();
        const cid = resData.IpfsHash;
        console.log("File(s) uploaded to IPFS:", cid);
        return cid;
    } catch (error) {
        console.error("Error uploading files to IPFS:", error);
        return null;
    }
  }

  async function fetchFromIpfs(cid) {
        console.log('Fetching file from IPFS...');
        try {
            const res = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            // Assuming the file is an image or a downloadable file, we convert the response to a blob
            const fileBlob = await res.blob(); // Get the response as a Blob
            console.log("File fetched from IPFS:", fileBlob);
            
            // Create a URL for the blob
            const fileURL = URL.createObjectURL(fileBlob);
            
            // Optional: You can return the file URL directly
            return fileURL; // or return fileBlob if you want to handle it differently

        } catch (error) {
            console.error("Error fetching files from IPFS:", error);
            return null;
        }
    }


    return(
        <IpfsContext.Provider value ={{ uploadToIpfs, fetchFromIpfs }} >
            {children}
        </IpfsContext.Provider>

    )
};

export const useIPFS = () => useContext(IpfsContext);
