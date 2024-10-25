"use client";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    sunnyYellow: {
      50: "#FFEEC8",
      100: "#FFEEC8",
      200: "#FFEEC8",
      300: "#FFEEC8",
      400: "#FFEEC8",
      500: "#FFEEC8",
      600: "#FFEEC8",
      700: "#FFEEC8",
      800: "#FFEEC8",
      900: "#FFEEC8",
    },
    darkYellow: "#F7D07A",
    skyBlue: "#97BDFF",
  },
  fonts: {
    heading: "Lexend Deca, sans-serif",
    body: "Lexend Deca, sans-serif",
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 500,
      },
    },
    Card: {
      baseStyle: {
        bg: "sunnyYellow.100",       // Set the default background color
        borderRadius: "50px",    // Set the default border radius (e.g., "lg" or a specific value like "16px")
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "skyBlue",
        color: "white",
      },
    },
  },
});

export default theme;
