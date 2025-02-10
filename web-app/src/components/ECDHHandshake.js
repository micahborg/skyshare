/*ECDH handshake for generating keys for skyShare.
Description: This is to generate keys using the ECDH key exchange 
Programmers: Brynn Hare, Micah Borghese, Katelyn Accola, Nora Manolescu, Kyle Johnson
Date Created: 10/28/2024
*/

// Access local browser storage (store public key)
// See if public key exists in local browser storage
//      If it doesn't, generate and store public key
//      If it does, set and use existing public key
// Listen for other public key 

// Sample from ChatGPT (NOT IMPLEMENTATION YET JUST AS NOTES FOR ME LOL):
// CHANGES TO MAKE: we're using WebRTC to communicate with other peers so code should be adjusted for that too specifically
//                  also revise code with pseudocode above 

// Generate a key pair?
async function generateKeyPair() {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "ECDH",
            namedCurve: "P-256" // P-384 or P-521 instead? 
        },
        true, // Extractable
        ["deriveKey", "deriveBits"]
    );
    return keyPair;
}

// Function to export the public key to format where it can stored/transmitted (export the public key to base64 string)
// Takes public key as input, exports it to Subject Public Key Info format, converts to Base64 string to store/transmit easily
async function exportPublicKey(publicKey) {
    const exported = await window.crypto.subtle.exportKey(
        "spki", // Subject Public Key Info format 
        publicKey
    );
    return btoa(String.fromCharCode(...new Uint8Array(exported)));
}

// Function to store public key in local storage
function storePublicKey(publicKey) {
    localStorage.setItem("publicKey", publicKey);
}

// Function to retrieve public key from local storage
function getPublicKey() {
    return localStorage.getItem("publicKey");
}

// Function for the key exchange
async function initKeyExchange() {
    let publicKey = getPublicKey();

    if (!publicKey) { // Generate key if it doesn't exist 
        const keyPair = await generateKeyPair();
        publicKey = await exportPublicKey(keyPair.publicKey);
        storePublicKey(publicKey);
        console.log("Generated and stored new public key:", publicKey);
    } else {
        // Otherwise, use existing public key if it does exist
        console.log("Using existing public key:", publicKey); 
    }

    // Listen for incoming public keys -- CHANGE THIS STUFF? We'll be using WebRTC
    listenForOtherPublicKeys();
}

// Function to listen for incoming public keys -- CHANGE FOR WebRTC???
function listenForOtherPublicKeys() {
    // Replace this with your actual implementation to receive public keys
    window.addEventListener("message", (event) => {
        if (event.data.type === "PUBLIC_KEY") {
            console.log("Received public key from another peer:", event.data.key);
            // TO ADD: key exchange logic using the received public key
        }
    });
}

// Key exchange process
initKeyExchange().catch(console.error);
