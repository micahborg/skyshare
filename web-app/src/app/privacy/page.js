"use client";
import React, { useEffect, useState } from "react";
import { Link, Heading, Card, Box, useBreakpointValue, List, ListItem, ListIcon, VStack, Flex, Image, Text } from "@chakra-ui/react";
import { MdCancel } from "react-icons/md";
import { useLoading } from "@/contexts/LoadingContext";
import NavBar from "@/components/NavBar";

function About() {
    const headingSize = useBreakpointValue({ base: "3xl", md: "5xl", lg: "7xl" });
    const margin = useBreakpointValue({ base: 4, md: 6 });
    const { setLoading } = useLoading();

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
      <Box>
        <NavBar />
        <Box textAlign="left" mt={8}>
          <Heading fontSize={headingSize} m={margin} mt={8} textAlign="center">
              Privacy Policy
          </Heading>

          <Card
            bg="sunnyYellow.100"
            p={10}
            mb={10}
            width={{ base: '90%', md: '70%' }}
            mx="auto"
            px={{ base: 4, md: 20 }}
            textAlign="left"
          >
            <Text><strong>Effective Date:</strong> 4/24/2025</Text>

            <Box mt={4} width="100%">
              <Text>
                While using skyShare, your privacy is a priority. We designed our platform to minimize the data we collect and to put control into your hands. This policy explains what information we collect, how we use it, and how we keep it safe.
              </Text>
            </Box>

            <Box mt={6} width="100%">
              <Heading size="md" mb={2}>🔐 What We Collect</Heading>
              <Text mb={2}>
                We do <strong>not</strong> collect any personally identifiable information (PII), account credentials, or browsing history.
                The only data we temporarily handle is what’s required to establish a secure peer-to-peer (P2P) connection using WebRTC:
              </Text>
              <List spacing={2} pl={5} styleType="disc">
                <ListItem>Device session identifiers (random, non-persistent)</ListItem>
                <ListItem>Network routing info (ICE candidates)</ListItem>
              </List>
            </Box>

            <Box mt={6} width="100%">
              <Heading size="md" mb={2}>🕒 How Long We Keep It</Heading>
              <Text mb={2}>
                All connection data is <strong>transient</strong>:
              </Text>
              <List spacing={2} pl={5} styleType="disc">
                <ListItem>Once a peer-to-peer connection is established, signaling data is discarded immediately.</ListItem>
                <ListItem>If no connection is established, data is auto-cleared after approximately <strong>30 minutes</strong>.</ListItem>
              </List>
            </Box>

            <Box mt={6} width="100%"> 
              <Heading size="md" mb={2}>🗂️ What We Don’t Do</Heading>
              <List spacing={2} pl={5}>
                <ListItem>
                  <ListIcon as={MdCancel} color="red.500" />
                  We do <strong>not</strong> store your files, messages, or notes on any server.
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCancel} color="red.500" />
                  We do <strong>not</strong> track your activity or share any data with third parties.
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCancel} color="red.500" />
                  We do <strong>not</strong> use cookies or analytics tools in the browser extension.
                </ListItem>
              </List>
              <Text mt={2}>
                All content shared using skyShare is encrypted and sent <strong>directly</strong> between devices.
              </Text>
            </Box>

            <Box mt={6} width="100%">
              <Heading size="md" mb={2}>⚙️ Third-Party Services</Heading>
              <Text>
                We operate our own signaling server to enable WebRTC connections. This server is used <strong>solely</strong> to coordinate the initial connection and does not store user content.
              </Text>
            </Box>

            <Box mt={6} width="100%">
              <Heading size="md" mb={2}>📞 Contact Us</Heading>
              <Text>
                If you have questions or concerns about your privacy when using skyShare, feel free to reach out:<br />
                <strong>Email:</strong>{' '}
                <Link href="mailto:help@skyshare.technology" color="blue.600">
                  help@skyshare.technology
                </Link>
              </Text>
            </Box>
          </Card>
        </Box>
      </Box>
    );
}

export default About;