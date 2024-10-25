import { Box, Heading, Card } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import FileUpload from "@/components/FileUpload";

const Home = () => {
  
  return (
    <Box>
      <NavBar />
      <Box m={20}>

      <Card bg="sunnyYellow.100"> 
        Hello
        <FileUpload />
      </Card>
      </Box>
    </Box>
  );
};

export default Home;
