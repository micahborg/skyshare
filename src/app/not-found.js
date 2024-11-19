/*Not found page for skyShare.
Description: This page will appear when any page other than the home or about pages are accessed.   
Programmers:Brynn Hare
Date Created: 11/17/2024
Edit Dates: 11/18 
*/

"use client";
import React, { useEffect, useState } from "react";
import {useBreakpointValue, Box, Heading, Card, Text} from "@chakra-ui/react";
import { useLoading } from "@/contexts/LoadingContext";
import NavBar from "@/components/NavBar";
import Errors from "@/components/ErrorScreen";

export default function NotFound() {
    const { setLoading } = useLoading();
    const headingSize = useBreakpointValue({ base: "3xl", md: "5xl", lg: "7xl" });
    const margin = useBreakpointValue({ base: 4, md: 6 });
    const cardWidth = useBreakpointValue({ base: "100%", md: "85%" });
    const cardHeight = useBreakpointValue({ base: "100px", md: "750px", lg: "100px" });


    useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 900);
    
        return () => clearTimeout(timer);
      }, []);

    return (
        
        <Box align="center">
                  <NavBar />
        <Heading size="2xl" m={margin} mt={8} textAlign="center">
        Page Not Found!
      </Heading>
      <Errors />
      
    <Card 
    bg="sunnyYellow.100" 
    p={6} 
    width={cardWidth} 
    height={cardHeight} 
    mx="auto" // Center the card horizontally
    mb={6}
>
    {/* Content inside the card */}
    Nothing to see here! Return to your previous page by clicking the back arrow. Return to the home page or about page by clicking the buttons on the navigation bar. 
</Card>
</Box>
    );
}
