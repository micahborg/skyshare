import { Box, Heading } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import FileUpload from "@/components/FileUpload";

const Home = () => {
  
  return (
    <Box>
      <NavBar />
      <Box m={20}>
      <FileUpload />
      </Box>
    </Box>
  );
};

export default Home;
