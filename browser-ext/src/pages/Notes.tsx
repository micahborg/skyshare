"use client";
import React, { useState, useEffect } from 'react';
import { Box, Textarea, Text, Button, VStack, HStack, Heading, Input, Flex, Image } from "@chakra-ui/react";
import theme from "../theme";
import { useWebRtc } from '../contexts/WebRtcContext'; // Adjust the path to match your project structure

const Notes: React.FC = () => {
  const [note, setNote] = useState<string>("");
  const [customName, setCustomName] = useState<string>("");
  const [savedNotes, setSavedNotes] = useState<{ name: string, note: string, timestamp: string, createdAt: string }[]>([]); // Add time stamp of creation
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track if a note is being edited
  const [isSearchVisible, setIsSearchVisible] = useState(false); // New state for showing search bar
  const [searchTerm, setSearchTerm] = useState<string>(""); // State to store the search input
  const { isConnected, sendFile, sendMessage } = useWebRtc(); // Use the WebRTC hook

  // Load saved notes from localStorage on component mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedNotes") || "[]");
    const now = Date.now();
    const expirationThreshold = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
  
    const filtered = saved.filter((note: any) => {
      return now - new Date(note.createdAt).getTime() < expirationThreshold;
    });
  
    setSavedNotes(filtered);
    localStorage.setItem("savedNotes", JSON.stringify(filtered));
  }, []);

  // Time stamp note will be stored as: Month/Day/Year Hour:Minute AM/PM
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "Invalid Date";
  
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
  
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
  
    return `${mm}/${dd}/${yy} ${hours}:${minutes}${ampm}`;
  };

  // Handle note input change
  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomName(event.target.value);
  };

  // Save or update note in localStorage
  const saveNote = () => {
    if (note.trim() === "") return;

    const timestamp = new Date().toISOString(); // Current time stamp
    if (editingIndex !== null) { 
      const updatedNotes = [...savedNotes];
      const updatedNote = updatedNotes[editingIndex];
      updatedNote.note = note; 
      updatedNote.timestamp = timestamp; 
      setSavedNotes(updatedNotes);
      localStorage.setItem("savedNotes", JSON.stringify(updatedNotes));
    } else {
      let name = customName.trim() !== "" ? customName : `${formatTimestamp(timestamp)}`;
      const newNote = { name, note, timestamp, createdAt: timestamp };
      const updatedNotes = [newNote, ...savedNotes];
      setSavedNotes(updatedNotes);
      localStorage.setItem("savedNotes", JSON.stringify(updatedNotes));
    }

    setNote(""); 
    setCustomName(""); 
    setEditingIndex(null);
  };

  const loadNote = (index: number) => {
    setNote(savedNotes[index].note);
    setCustomName(savedNotes[index].name);
    setEditingIndex(index); 
  };

  const deleteNote = () => {
    if (editingIndex === null) return;

    const updatedNotes = savedNotes.filter((_, i) => i !== editingIndex);
    setSavedNotes(updatedNotes);
    localStorage.setItem("savedNotes", JSON.stringify(updatedNotes));
    setEditingIndex(null);
    setNote(""); 
    setCustomName("");
  };

  const createNewNote = () => {
    setNote("");
    setEditingIndex(null); 
  };

  const shareNote = () => {
    if (isConnected) {
      const noteFile = new Blob([note], { type: 'text/plain' });
      const fileName = `note-${new Date().toISOString()}.txt`;
      const file = new File([noteFile], fileName, { type: 'text/plain' });
      sendFile(file); 
    }
  };

  // Toggle search bar visibility
  const toggleSearch = () => {
    setIsSearchVisible(prevState => !prevState);
  };

  // Handle the search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle the enter key press in the search bar
  const handleSearchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const noteToLoad = savedNotes.find(note => note.name.toLowerCase() === searchTerm.toLowerCase());
      if (noteToLoad) {
        const index = savedNotes.indexOf(noteToLoad);
        loadNote(index); // Load the note if found
        setIsSearchVisible(false);
      }
      setSearchTerm("");
    }
  };

  return (
    <VStack spacing={4} p={4} h="100vh">
      <Heading fontSize="xl" fontWeight="bold" textAlign="center">
        Notes
      </Heading>

      <HStack spacing={4} alignItems="flex-start" height="100%">
        <VStack p={4} borderRadius="lg" boxShadow="md" backgroundColor="sunnyYellow.100" alignItems="stretch" h="100%" w="30%" flex={2}>
          <Input
            value={customName}
            onChange={handleNameChange}
            placeholder="Optional Note Title"
            color="black"
            size="sm"
            mb={2}
            borderColor="gray.400"
          />
          <Textarea
            value={note}
            onChange={handleNoteChange}
            flexGrow={1}
            padding="10px"
            fontSize="md"
            border="1px solid"
            borderColor={theme.border}
            borderRadius="5px"
            backgroundColor="darkYellow"
            color={theme.inputText}
            placeholder="Write your notes here..."
            resize="none"
          />
          <HStack width="100%" justifyContent="space-between" pt={2}>
            <Button onClick={shareNote}>+</Button> 
            <Button onClick={saveNote}>Save</Button>
            <Button onClick={deleteNote} isDisabled={editingIndex === null}>-</Button>
          </HStack>
        </VStack>

        <Box height="100%" maxHeight="78vh" backgroundColor="sunnyYellow.100" flex={1} borderRadius="lg" boxShadow="md" p={4} w="45%" overflowY="auto">
          <Flex>
            <Text fontWeight="bold" mb="2px" color="black" whiteSpace="nowrap">Saved Notes</Text>
            <Image ml="4px" boxSize="12px" src="/images/magnify_glass.png" alt="magnifying glass" cursor="pointer" onClick={toggleSearch} />
          </Flex>

          {/* Conditionally render the search bar */}
          {isSearchVisible && (
            <Input
              placeholder="Search Title"
              size="sm"
              mb={2}
              color="black"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchEnter} 
              width="110%"
            />
          )}

          {savedNotes.length > 0 ? (
            <VStack flex={1} align="start" id="saved-notes" spacing={2} overflowY="auto">
              {savedNotes.map((savedNote, index) => (
                <HStack key={index} p={2} borderBottom="1px solid gray" w="100%" justifyContent="space-between">
                  <Text 
                    cursor="pointer" 
                    _hover={{ textDecoration: "underline" }} 
                    onClick={() => loadNote(index)}
                    fontSize="sm" 
                    color="gray.600" 
                  >
                    {savedNote.name} 
                  </Text>
                </HStack>
              ))}
            </VStack>
          ) : (
            <Text color="black">No saved notes yet.</Text>
          )}
        </Box>
      </HStack>
    </VStack>
  );
};

export default Notes;
