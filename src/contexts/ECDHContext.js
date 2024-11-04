/*ECDH handshake for generating keys for skyShare.
Description: This is to generate keys using the ECDH key exchange 
Programmers: Brynn Hare, Micah Borghese, Katelyn Accola, Nora Manolescu, Kyle Johnson
Date Created: 10/28/2024
*/

// TO DO: Comments
import React, { createContext, useEffect, useState } from 'react';

// Create a context for ECDH
export const ECDHContext = createContext();

const ECDHProvider = ({ children }) => {
    const [publicKey, setPublicKey] = useState(null);

    // Function to generate a key pair
    const generateKeyPair = async () => {
        return await window.crypto.subtle.generateKey(
            {
                name: "ECDH",
                namedCurve: "P-256"
            },
            true, // Extractable
            ["deriveKey", "deriveBits"]
        );
    };

    // Function to export the public key to Base64 string
    const exportPublicKey = async (key) => {
        const exported = await window.crypto.subtle.exportKey("spki", key);
        return btoa(String.fromCharCode(...new Uint8Array(exported)));
    };

    // Function to store the public key in local storage
    const storePublicKey = (key) => {
        localStorage.setItem("publicKey", key);
    };

    // Function to retrieve the public key from local storage
    const getPublicKey = () => {
        return localStorage.getItem("publicKey");
    };

    // Function to initialize the key exchange
    const initKeyExchange = async () => {
        let storedKey = getPublicKey();

        if (!storedKey) {
            const keyPair = await generateKeyPair();
            const exportedKey = await exportPublicKey(keyPair.publicKey);
            storePublicKey(exportedKey);
            setPublicKey(exportedKey);
            console.log("Generated and stored new public key:", exportedKey);
        } else {
            setPublicKey(storedKey);
            console.log("Using existing public key:", storedKey);
        }

        // Listen for incoming public keys
        listenForOtherPublicKeys();
    };

    // Function to listen for incoming public keys (using WebRTC)
    const listenForOtherPublicKeys = () => {
        // Replace with your actual WebRTC implementation to receive public keys
        window.addEventListener("message", (event) => {
            if (event.data.type === "PUBLIC_KEY") {
                console.log("Received public key from another peer:", event.data.key);
                // Implement key exchange logic here
            }
        });
    };

    useEffect(() => {
        initKeyExchange().catch(console.error);
    }, []);

    return (
        <ECDHContext.Provider value={{ publicKey }}>
            {children}
        </ECDHContext.Provider>
    );
};

export default ECDHProvider;

// To use in our application (from ChatGPT)
// Need to double check where this is placed?
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';  // Your main app component
// import ECDHProvider from './ECDHContext'; // Import the ECDHProvider

// ReactDOM.render(
//     <ECDHProvider>
//         <App />
//     </ECDHProvider>,
//     document.getElementById('root')
// );