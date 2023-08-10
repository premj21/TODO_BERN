import {Box,Text} from '@chakra-ui/react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Wallet from './components/Wallet';
import AllTask from './components/AllTask';
import CreateTask from './components/CreateTask';
import { useState } from 'react';
function App() {
  const navigate = useNavigate(); 
  const [p,setp] = useState({web3:null,contract:null,account:null});
  return (
    <Box w="100vw" h="100vh">
      <Box
        w="100vw"
        h="auto"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        p="2rem 4rem 0 4rem"
      >
        <Text
          fontWeight={"500"}
          fontSize={"3vmin"}
          fontFamily={"SaolDisplay-Regular"}
          cursor="pointer"
          onClick={() => navigate("/")}
        >
          TODO
        </Text>
        <Box display={"flex"} gap="40px">
          <Text
            fontWeight={"500"}
            fontSize={"2vmin"}
            _hover={{ color: "red" }}
            fontFamily={"SaolDisplay-Regular"}
            cursor="pointer"
            onClick={() => navigate("/")}
          >
            Wallet
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"2vmin"}
            _hover={{ color: "red" }}
            cursor="pointer"
            fontFamily={"SaolDisplay-Regular"}
            onClick={() => navigate("/create-task")}
          >
            CreateTask
          </Text>

          <Text
            fontWeight={"500"}
            fontSize={"2vmin"}
            _hover={{ color: "red" }}
            cursor="pointer"
            onClick={() => navigate("/alltask")}
            fontFamily={"SaolDisplay-Regular"}
          >
            AllTask
          </Text>
        </Box>
      </Box>
      <Box w="100vw" h="95vh">
        <Routes>
          <Route exact path="/" element={<Wallet setp={setp} />} />
          <Route exact path="/alltask" element={<AllTask p={p} />} />
          <Route exact path="/create-task" element={<CreateTask  p={p}/>} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
