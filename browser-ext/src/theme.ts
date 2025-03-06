"use client";
import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  sm: "322px", 
  md: "500px", 
  lg: "765px", 
};

const theme = extendTheme({
  breakpoints,
  // custom sizes for the windows
  views: {
    default: {
      width: "500px",
      height: "327px",
    },
  },
  fontSizes: {
    sm: "12px",
    md: "14px",
    lg: "16px",
  },
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
          padding: 5,
          bg: "darkYellow",
          fontSize: ["lg", "xl", "xl"], // breakpoints for button size (base, md, lg)
          color: "white",
          borderRadius: "full",
          _hover: {
            bg: "darkYellow",
            textDecoration: "underline",
          },
        },
        light: {
          bg: "darkYellow",
          fontSize: ["lg", "xl", "xl"], // breakpoints for button size (base, md, lg)
          color: "white",
          borderRadius: "none",
          _hover: {
            bg: "sunnyYellow.100",
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
        size: ["md", "lg", "lg"], // breakpoints for heading size (base, md, lg)
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