# skyShare 🌥️🦒🌥️

A *peer-to-peer* sharing app

## Key Features

- Cross-Platform, Peer-to-Peer Communication
    - File transfer
    - Note taking
    - Chat
- Secure Pairing Process (no sign-in)
- Files, chats, and notes are never stored or viewed by any other party

## Why skyShare is unlike anything else

- ***Real-Time Connection (WebRTC)***:
    - P2P connection over the internet, allowing users to connect from anywhere without needing to be on the same local network.
- ***No Sign-In Needed***:
    - Scan a QR code to directly connect between devices via P2P technologies.
- ***No Centralized Control***:
    - Entirely decentralized, with no single point of control over file distribution, whereas similar software might be a proprietary application with centralized management of the app’s functionality, updates, and file storage.

## Technical Implementation
![skyShareDiagram](https://github.com/user-attachments/assets/6351f664-6a13-47f6-b347-b8e3b88fdcec)
- __***WebRTC for Peer-to-Peer Sharing***__:
    - Establishes direct connections using RTCPeerConnection and RTCDataChannel
    - Transfers data efficiently without intermediate servers
- ***QR Code Pairing***:
    - One device generates a QR code, and the other scans it to initiate pairing
    - Provides secure and intuitive device connections

Made with 🦒 by Micah, Brynn, Katelyn, Nora, and Kyle!

[https://skyshare.technology/about](https://skyshare.technology/about)
