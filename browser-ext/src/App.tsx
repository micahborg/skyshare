"use client";
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Pair from "./pages/Pair";
import Notes from "./pages/Notes";
import Chat from "./pages/Chat";
import Files from "./pages/Files";
import { LoadingProvider } from "./contexts/LoadingContext";
import { WebRtcProvider } from "./contexts/WebRtcContext.jsx";
import LoadingComponent from "./components/LoadingComponent";
import { Box, ChakraProvider } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import theme from "./theme"; // Applying our theme to the page
import GiraffeGame from './components/GiraffeGame';
import Connected from "./components/Connected";
// import "@fontsource/lexend-deca"; // Import the font to use

function App() {
  return (
    <ChakraProvider theme={theme}> {/* Apply the theme */}
      <WebRtcProvider>
      <LoadingProvider>
        <Router>
          <LoadingComponent />
          <NavBar />
          <Connected />
          <Box ml="25vw">
            <Routes>
              <Route path="/" element={<Pair />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/files" element={<Files />} />
              <Route path="/game" element={<GiraffeGame />} />
            </Routes>
          </Box>
        </Router>
      </LoadingProvider>
      </WebRtcProvider>
    </ChakraProvider>
  );
}

export default App;
