import { Box, Heading, Card } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import FileUpload from "@/components/FileUpload";
import FileUploadModal from "@/components/FileUploadModal";

const Home = () => {
  
  return (
    <Box>
      <NavBar />
      <Box m={20}>

      <Card bg="sunnyYellow.100"p={4} maxW="400px" mx="auto"> 
        <FileUploadModal />
      </Card>
      </Box>
    </Box>
  );
};

export default Home;
