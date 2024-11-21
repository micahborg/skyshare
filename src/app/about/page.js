/*About page for skyShare.
Description: This page has the about discription of our site as well as user testimonials.   
Programmers: Micah Borghese, Katelyn Accola, Brynn Hare, Nora Manolescu, and Kyle Johnson
Date Created: 10/29/2024
Edit Dates: 11/17 (Testimonials), 11/20 (About content/mobile resizing)
*/

"use client";
import React, { useEffect, useState } from "react";
import { Heading, Card, Box, useBreakpointValue, Flex, Image, Text } from "@chakra-ui/react";
import { useLoading } from "@/contexts/LoadingContext";
import NavBar from "@/components/NavBar";
import { useDisclosure } from "@chakra-ui/react";

function About() {
    const cardWidth = useBreakpointValue({ base: "100%", md: "85%" });
    const cardHeight = useBreakpointValue({ base: "auto", md: "400px", lg: "500px" }); // Auto height for responsiveness
    const testimonialWidth = useBreakpointValue({ base: "100%", md: "85%" });
    const testimonialHeight = useBreakpointValue({ base: "auto", md: "auto", lg: "200px" }); // Auto height
    const headingSize = useBreakpointValue({ base: "3xl", md: "5xl", lg: "7xl" });
    const margin = useBreakpointValue({ base: 4, md: 6 });
    const { setLoading } = useLoading();

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <div>
            <NavBar />
            <Box textAlign="center" mt={8}>
                <Heading fontSize={headingSize} m={margin} mt={8} textAlign="center">
                    About skyShare
                </Heading>

                {/* Card for About SkyShare */}
                <Card 
                    bg="sunnyYellow.100" 
                    p={10} 
                    width={cardWidth} 
                    mx="auto" 
                    px={{ base: 4, md: 20 }}
                >
                    skyShare was created to provide a simple, fast, and seamless way to transfer files across devices, no matter the brand. We understand that in the digital world of today, the need to share photos, documents, and more between different platforms is essential—and we believe it should be effortless.
                    
                    <Heading as="h3" size="md" mb={2} mt={10}>
                        Our Mission
                    </Heading>
                    We are committed to making your digital life easier. Our goal is to provide a fast and user-friendly file transfer solution that allows you to stay connected across all your devices. With skyShare, transferring files becomes as simple as a tap, ensuring your data is always just a few steps away—no matter the device you are using.

                    <Heading as="h3" size="md" mb={2} mt={10}>
                        Who We Are
                    </Heading>
                    skyShare was created by Micah Borghese, Brynn Hare, Nora Manolescu, Kyle Johnson, and Katelyn Accola.
                </Card>

                <Heading fontSize={headingSize} m={margin} mt={7} textAlign="center">
                    Testimonials
                </Heading>

                {/* Testimonial Card 1 */}
                <Card 
                    bg="sunnyYellow.100" 
                    p={6} 
                    width={testimonialWidth} 
                    mx="auto" 
                    mb={6}
                >
                    <Flex direction={{ base: "column", md: "row" }} align="center" height="auto">
                        {/* Left: Image */}
                        <Box flexShrink={0} mr={{ base: 0, md: 4 }} mb={{ base: 4, md: 0 }}>
                            <Image 
                                src="/images/sadgiraffe.png" 
                                alt="Image of the person giving the testimonial" 
                                boxSize={{ base: "100px", md: "150px", lg: "200px" }} 
                                objectFit="cover" 
                                borderRadius="md" 
                            />
                        </Box> 

                        {/* Right: Text */}
                        <Box textAlign="left">
                            <Heading as="h3" size="md" mb={2}>
                                Testimonial Person Name 1
                            </Heading>
                            <Text fontSize="sm">
                                The content of the testimonial. blah blah blah blah blah blah blah blah blah blah blah
                            </Text>
                        </Box>
                    </Flex>
                </Card>

                {/* Testimonial Card 2 */}
                <Card 
                    bg="sunnyYellow.100" 
                    p={6} 
                    width={testimonialWidth} 
                    mx="auto" 
                    mb={6}
                >
                    <Flex direction={{ base: "column", md: "row" }} align="center" height="auto">
                        {/* Left: Image */}
                        <Box flexShrink={0} mr={{ base: 0, md: 4 }} mb={{ base: 4, md: 0 }}>
                            <Image 
                                src="/images/sadgiraffe.png" 
                                alt="Image of the person giving the testimonial" 
                                boxSize={{ base: "100px", md: "150px", lg: "200px" }} 
                                objectFit="cover" 
                                borderRadius="md" 
                            />
                        </Box> 

                        {/* Right: Text */}
                        <Box textAlign="left">
                            <Heading as="h3" size="md" mb={2}>
                                Testimonial Person Name 2
                            </Heading>
                            <Text fontSize="sm">
                                The content of the testimonial. blah blah blah blah blah blah blah blah blah blah blah
                            </Text>
                        </Box>
                    </Flex>
                </Card>

                {/* Testimonial Card 3 */}
                <Card 
                    bg="sunnyYellow.100" 
                    p={6} 
                    width={testimonialWidth} 
                    mx="auto" 
                    mb={6}
                >
                    <Flex direction={{ base: "column", md: "row" }} align="center" height="auto">
                        {/* Left: Image */}
                        <Box flexShrink={0} mr={{ base: 0, md: 4 }} mb={{ base: 4, md: 0 }}>
                            <Image 
                                src="/images/sadgiraffe.png" 
                                alt="Image of the person giving the testimonial" 
                                boxSize={{ base: "100px", md: "150px", lg: "200px" }} 
                                objectFit="cover" 
                                borderRadius="md" 
                            />
                        </Box> 

                        {/* Right: Text */}
                        <Box textAlign="left">
                            <Heading as="h3" size="md" mb={2}>
                                Testimonial Person Name 3
                            </Heading>
                            <Text fontSize="sm">
                                The content of the testimonial. blah blah blah blah blah blah blah blah blah blah blah
                            </Text>
                        </Box>
                    </Flex>
                </Card>
            </Box>
        </div>
    );
}

export default About;