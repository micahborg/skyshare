# skyShare 🌥️🦒🌥️

A *peer-to-peer*  sharing app

## Key Features

- Cross-Platform File Transfer
- Peer-to-Peer Communication
    - File transfer
    - Chat
- Secure Pairing Process (no sign-in)
- Files are not stored permanently

## Why skyShare is unlike anything else

- ***Real-Time Connection (WebRTC)***:
    - P2P connection over the internet, allowing users to connect from anywhere without needing to be on the same local network.
- ***No Sign-In Needed***:
    - Direct connection between devices via P2P technologies.
- ***Scalability and Accessibility***:
    - Leverages IPFS to make files available even after the sender disconnects, as other IPFS nodes can continue to serve the file.
- ***No Centralized Control***:
    - Entirely decentralized, with no single point of control over file distribution, whereas similar software might be a proprietary application with centralized management of the app’s functionality and updates, and sometimes file storage.

## Technical Implementation

- __***WebRTC for Peer-to-Peer Sharing***__:
    - Establishes direct connections using RTCPeerConnection and RTCDataChannel
    - Transfers data efficiently without intermediate servers
- ***IPFS File Content Identifiers (CIDs)***:
    - Each time a file is uploaded, its content is hashed and shared through IPFS
    - Utilizing IPFS allows for the assurance of delivery, and saves space when files are not downloaded
    - Since IPFS is a worldwide protocol, it is not in skyShare’s use case to share sensitive data
- ***QR Code Pairing***:
    - One device generates a QR code, and the other scans it to initiate pairing
    - Provides secure and intuitive device connections

Made with 🦒 by Team 14!

[https://skyshare-pi.vercel.app/about](https://skyshare-pi.vercel.app/about)
