"use client";
import { background, border, extendTheme } from "@chakra-ui/react";
import { m } from "framer-motion";

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
    Button: {
      variants: {
        solid: {
          bg: "darkYellow",
          color: "black",
          borderRadius: "full",
          _hover: {
            textDecoration: "underline",
          },
        },
      },
      defaultProps: {
        variant: "solid",
      },
    },
    Heading: {
      defaultProps: {
        size: "lg",
      },
      baseStyle: {
        fontWeight: 500,
      },
    },
    Card: {
      baseStyle: {
        container: {
          color: "black",
          maxWidth: "75vw", 
          backgroundColor: "sunnyYellow.100",  // Replace with your preferred color
          borderRadius: "3xl",
          alignItems: "center",
          padding: 4,
        },
      },
    },
    Modal: {
      baseStyle: {
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        },
        dialog: {
          padding: 5,
          alignItems: "center",
          color: "white",
          backgroundColor: "darkYellow",
          borderRadius: "3xl",
          shadow: "none",
        },
        closeButton: {
          padding: 5,
          color: "white",
          backgroundColor: "black",
          borderRadius: "full",
          marginTop: -5,
          marginRight: -5,
        },
      },
    }
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
