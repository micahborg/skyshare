"use client";
import React, { useState, useEffect } from 'react';
import { Box, Textarea, Text, Button, VStack, HStack, Heading } from "@chakra-ui/react";
import theme from "../theme";

const Notes: React.FC = () => {
  const [note, setNote] = useState<string>("");
  const [savedNotes, setSavedNotes] = useState<{ note: string, timestamp: string, createdAt: string }[]>([]); // Add time stamp of creation
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track if a note is being edited

  // Load saved notes from localStorage on component mount
  useEffect(() => {
    const storedNotes = localStorage.getItem("savedNotes");
    if (storedNotes) {
      setSavedNotes(JSON.parse(storedNotes));
    }
  }, []);

  // // Time stamp note will be stored as: Month Day, Year, Hour:Minute:Second
  // const formatTimestamp = (timestamp: string) => {
  //   const date = new Date(timestamp);
  //   if (isNaN(date.getTime())) return "Invalid Date"; // Handling invalid date
  //   return date.toLocaleString("en-US", {
  //     month: "short",
  //     day: "numeric",
  //     year: "numeric",
  //     hour: "numeric",
  //     minute: "numeric",
  //     second: "numeric", 
  //     hour12: true
  //   });
  // };
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
  
    return `${mm}/${dd}/${yy} ${hours}:${minutes} ${ampm}`;
  };
  

  // Handle note input change
  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  // Save or update note in localStorage
  const saveNote = () => {
    if (note.trim() === "") return;

    const timestamp = new Date().toISOString(); // Current time stamp
    console.log("Timestamp:", timestamp);
    // Checking if note is being edited vs. being created for the first time
    if (editingIndex !== null) { 
      // Update the existing note
      const updatedNotes = [...savedNotes];
      const updatedNote = updatedNotes[editingIndex];
      updatedNote.note = note; // Update the note content
      updatedNote.timestamp = timestamp; // Store the time stamp
      setSavedNotes(updatedNotes);
      localStorage.setItem("savedNotes", JSON.stringify(updatedNotes));
    } else {
      // Save a new note with time stamp of creation
      const newNote = { note, timestamp, createdAt: timestamp };
      const updatedNotes = [...savedNotes, newNote];
      setSavedNotes(updatedNotes);
      localStorage.setItem("savedNotes", JSON.stringify(updatedNotes));
    }

    setNote(""); // Clear the textarea after saving
    setEditingIndex(null); // Reset editing state
  };

  // Loading a saved note and setting it to be edited
  const loadNote = (index: number) => {
    setNote(savedNotes[index].note);
    setEditingIndex(index); // Set the index for the note being edited
  };

  // Delete a saved note
  const deleteNote = () => {
    if (editingIndex === null) return;

    const updatedNotes = savedNotes.filter((_, i) => i !== editingIndex);
    setSavedNotes(updatedNotes);
    localStorage.setItem("savedNotes", JSON.stringify(updatedNotes));
    setEditingIndex(null); // Reset editing state
    setNote(""); // Clear the note input
  };

  // Creating a new note (clear the editor)
  const createNewNote = () => {
    setNote("");
    setEditingIndex(null); // Reset editing state
  };

  return (
    <VStack spacing={4} p={4} h="100vh">
      {/* Notes Title */}
      <Heading fontSize="xl" fontWeight="bold" textAlign="center">
        Notes
      </Heading>

      <HStack spacing={4} alignItems="flex-start" height="100%">
        {/* Main Notes Section */}
        <VStack
          p={4}
          borderRadius="lg"
          boxShadow="md"
          backgroundColor="sunnyYellow.100"
          alignItems="stretch"
          h="100%"
          flex={2}
        >
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
            <Button onClick={createNewNote}>+</Button> {/* Create new note button */}
            <Button onClick={saveNote}>Save</Button>
            <Button onClick={deleteNote} isDisabled={editingIndex === null}>-</Button> {/* Delete current note button */}
          </HStack>
        </VStack>

        {/* Saved Notes Section */}
        <Box
          height="100%"
          maxHeight="78vh"
          backgroundColor="sunnyYellow.100"
          flex={1} 
          borderRadius="lg"
          boxShadow="md"
          p={4}
          w="40%"
          overflowY="auto"
        >
          <Text fontWeight="bold" mb={2} color="black">Saved Notes</Text>
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
                    {formatTimestamp(savedNote.timestamp)} {/* Display formatted timestamp */}
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