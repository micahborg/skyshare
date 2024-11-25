/*Tutorial page for skyShare.
Description: This page has a tutorial on how to use skyShare. 
Programmers: Micah Borghese, Katelyn Accola, Brynn Hare, Nora Manolescu, and Kyle Johnson
Date Created: 11/25/2024
Edit Dates: 
*/

"use client";
import React, { useEffect, useState } from "react";
import { Link, Heading, Card, Box, useBreakpointValue, Flex, Image, Text } from "@chakra-ui/react";
import { useLoading } from "@/contexts/LoadingContext";
import NavBar from "@/components/NavBar";
import { useDisclosure } from "@chakra-ui/react";


export default Tutorial;