/*ECDH handshake for generating keys for skyShare.
Description: This is to generate keys using the ECDH key exchange 
Programmers: Brynn Hare, Micah Borghese, Katelyn Accola, Nora Manolescu, Kyle Johnson
Date Created: 10/28/2024
*/

"use client";
import { useState } from "react";

// ECDH Key exchange class
export const ECDH = () => {
  const [publicKey, setPublicKey] = useState(null);
  const [sharedSecret, setSharedSecret] = useState(null);

  // Initialize the ECDH key pair
  const generateKeyPair = async () => { 
    try {
    // Generate the ECDH key pair 
      const ecdhKeyPair = await crypto.subtle.generateKey(
        {
          name: "ECDH",
          namedCurve: "P-256", // P-256 curve
        },
        true, // whether the key is extractable
        ["deriveKey", "deriveBits"] // key usage
      );

      // Export public key to JWK (JSON Web Key) format so it can be shared with a remote peer
      const publicKeyJwk = await crypto.subtle.exportKey("jwk", ecdhKeyPair.publicKey);
      setPublicKey(publicKeyJwk);
      return ecdhKeyPair;
    } catch (error) {
      console.error("Error generating ECDH key pair:", error);
    }
  };

  // Derive shared secret from private key and the remote party's public key
  // Shared secret will be used later used for encryption/decryption
  const deriveSharedSecret = async (privateKey, remotePublicKey) => {
    try {
      const remoteKey = await crypto.subtle.importKey(
        "jwk",
        remotePublicKey,
        {
          name: "ECDH",
          namedCurve: "P-256",
        },
        false,
        [] // no key usages required for this import
      );

      const secret = await crypto.subtle.deriveBits(
        {
          name: "ECDH",
          public: remoteKey,
        },
        privateKey,
        256 // length of the derived secret in bits
      );

      setSharedSecret(secret);
      return secret;
    } catch (error) {
      console.error("Error deriving shared secret:", error);
    }
  };

  // Export the shared secret as a buffer (e.g., to be used for encryption/decryption)
  const getSharedSecretBuffer = () => {
    // Returns derived shared secret
    // The returned buffer can be used later for encrypting/decrypting WebRTC messages
    return sharedSecret;
  };

  return {
    generateKeyPair,
    deriveSharedSecret,
    publicKey,
    sharedSecret,
    getSharedSecretBuffer,
  };
};