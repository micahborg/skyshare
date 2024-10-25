import { Box, Heading } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import FileUpload from "@/components/FileUpload";
import FileUploadModal from "@/components/FileUploadModal";

const Home = () => {
  
  return (
    <Box>
      <NavBar />
      <Box m={20}>
      <FileUploadModal />
      </Box>
    </Box>
  );
};

export default Home;
