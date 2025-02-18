import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Chat from "./pages/Chat";
import { LoadingProvider } from "./contexts/LoadingContext";
import LoadingComponent from "./components/LoadingComponent";
import { Box } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

function App() {
  return (
    <LoadingProvider>
      <Router>
        <LoadingComponent />
        <NavBar />
        <Box ml="25vw">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Box>
      </Router>
    </LoadingProvider>
  );
}

export default App;
