import { Box, Heading, Card } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import FileUpload from "@/components/FileUpload";
import FileUploadModal from "@/components/FileUploadModal";
import QRCodeGenerator from "@/components/QRCodeGenerator";

const Home = () => {
  
  return (
    <Box>
      <NavBar />
      <Box m={20}>

      <Card bg="sunnyYellow.100"p={4} maxW="400px" mx="auto"> 
        {/* <FileUploadModal /> */}
        <QRCodeGenerator link="https://www.google.com" />
      </Card>
      </Box>
    </Box>
  );
};

export default Home;
