/*About page for skyShare.
Description: This page has the about discription of our site as well as user testimonials.   
Programmers: Micah Borghese, Katelyn Accola, Brynn Hare, Nora Manolescu, and Kyle Johnson
Date Created: 10/29/2024
Edit Dates: 11/17 (Testimonials), 11/20 (About content/mobile resizing)
*/

"use client";
import React, { useEffect, useState } from "react";
import { Link, Heading, Card, Box, useBreakpointValue, List, ListItem, ListIcon, VStack, Flex, Image, Text } from "@chakra-ui/react";
import { MdCancel } from "react-icons/md";
import { useLoading } from "@/contexts/LoadingContext";
import NavBar from "@/components/NavBar";
import { useDisclosure } from "@chakra-ui/react";

function About() {
    const cardWidth = useBreakpointValue({ base: "100%", md: "85%" });
    const headingSize = useBreakpointValue({ base: "3xl", md: "5xl", lg: "7xl" });
    const margin = useBreakpointValue({ base: 4, md: 6 });
    const { setLoading } = useLoading();

    const testimonials = [
        {
            name: "Madeleine Ryan",
            image: "/images/testimonial2.jpg",
            text: "skyShare is a game changer. Submitting assignments and sharing photos no longer involves several steps, and all of my files upload just as high resolution as I sent them. It is a must for the non Apple user."
        },
        {
            name: "Mara Manolescu",
            image: "/images/testimonial1.jpg",
            text: "What a great tool and innovative idea! I appreciate how easy this makes sharing files and how inclusive across devices it is!"
        },
        {
            name: "Megan Schalley",
            image: "/images/testimonial3.jpg",
            text: "skyShare has made file sharing so much simpler. I love how fast and seamless it is to upload and share without worrying about compatibility. It is the perfect solution for anyone looking for an easy, reliable way to connect across devices!"
        }
    ];

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