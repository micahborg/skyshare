import React, { useState, useEffect } from 'react';
import { Box, Textarea, Text, Button, VStack, HStack, Heading } from "@chakra-ui/react";
import theme from "../theme";

const Notes: React.FC = () => {
  const [note, setNote] = useState<string>("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);

  // Load saved notes from localStorage on component mount
  useEffect(() => {
    const storedNotes = localStorage.getItem("savedNotes");
    if (storedNotes) {
      setSavedNotes(JSON.parse(storedNotes));
    }
  }, []);

  // Handle note input change
  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  // Save note to localStorage
  const saveNote = () => {
    if (note.trim() === "") return;
    
    const updatedNotes = [...savedNotes, note];
    setSavedNotes(updatedNotes);
    localStorage.setItem("savedNotes", JSON.stringify(updatedNotes));
    setNote(""); // Clear the textarea after saving
  };

  // Load a saved note into the textarea
  const loadNote = (index: number) => {
    setNote(savedNotes[index]);
  };

  // Delete a saved note
  const deleteNote = (index: number) => {
    const updatedNotes = savedNotes.filter((_, i) => i !== index);
    setSavedNotes(updatedNotes);
    localStorage.setItem("savedNotes", JSON.stringify(updatedNotes));
  };

  return (
    <VStack spacing={4} p={4} alignItems="stretch" h="100vh">
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
            fontSize="16px"
            border="1px solid"
            borderColor={theme.border}
            borderRadius="5px"
            backgroundColor="darkYellow"
            color={theme.inputText}
            placeholder="Write your notes here..."
            resize="none"
          />
          <HStack width="100%" justifyContent="space-between" pt={2}>
            <Button>Share</Button>
            <Button onClick={saveNote}>Save</Button>
          </HStack>
        </VStack>

        {/* Saved Notes Section */}
        <Box
          height="100%"
          backgroundColor="sunnyYellow.100"
          borderRadius="lg"
          boxShadow="md"
          p={4}
          w="40%"
          overflowY="auto"
        >
          <Text fontWeight="bold" mb={2} color="black">Saved Notes</Text>
          {savedNotes.length > 0 ? (
            <VStack align="start" spacing={2} overflowY="auto">
              {savedNotes.map((savedNote, index) => (
                <HStack 
                  key={index} 
                  p={2} 
                  borderBottom="1px solid gray" 
                  w="100%" 
                  justifyContent="space-between" 
                  alignItems="center"
                >
                  <Box 
                    flex="1" 
                    overflow="hidden" 
                    whiteSpace="nowrap" 
                    textOverflow="ellipsis"
                  >
                    <Text 
                      color="black" 
                      cursor="pointer" 
                      _hover={{ textDecoration: "underline" }} 
                      onClick={() => loadNote(index)}
                    >
                      {savedNote}
                    </Text>
                  </Box>
                  <Button size="xs" colorScheme="red" onClick={() => deleteNote(index)}>Delete</Button>
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
