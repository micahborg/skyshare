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
    heading: "Arial, sans-serif",
    body: "Arial, sans-serif",
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
