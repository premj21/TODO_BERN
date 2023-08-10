import { Box,Button,Input,Skeleton,Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import axios from 'axios';

const CreateTask = ({p}) => {
   const {contract,account}=p;
  const toast = useToast(); 
  const [name,setname] = useState(""); 
  const [date,setdate] = useState("");
  const [sp,setsp] = useState(false); 

  const handlecreate = async(e)=>{
    e.preventDefault();
    try {
      if (name === "" || date === "") {
        toast({
          title: "Missing Information",
          description: "Fill the information Correctly",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      } else {
          setsp(true); 
          const { data } = await axios.post(
            `http://localhost:4000/eth/create-task`,
            {
              taskDate: date,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (data.success === true && contract && contract.methods) {
            await contract.methods
              .createTask(name, date)
              .send({ from: account });
              
            toast({
              title: "Task Operation . . .",
              description: "Task has been created successfully",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            setsp(false);
            setname("");
            setdate("");
          } else {
             setsp(false);
            toast({
              title: "Error",
              description: "Task Can not be Created",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          }
        }
      }
         catch (error) {
           setsp(false);
      toast({
        title: "Error",
        description: "Internal Server Error",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return (
    <Box
      w="100vw"
      h="95vh"
      display={"flex"}
      flexDir={"column"}
      p="4rem"
      alignItems={"center"}
      justifyItems={"center"}
    >
      <Box
        w="60%"
        h={"60%"}
        p="3rem"
        boxShadow={"0px 5px 20px rgba(0, 0, 0, 0.065)"}
        display={"flex"}
        flexDir={"column"}
        gap="30px"
      >
        <Box display={"flex"} justifyContent={"space-around"} gap="20px">
          <Text
            fontSize={"3vmin"}
           
            fontFamily={"SaolDisplay-Regular"}
            fontWeight={"500"}
          >
            TaskName
          </Text>
          <Input
            onChange={(e) => setname(e.target.value)}
            w="60%"
            type="text"
            value={name}
          />
        </Box>
        <Box display={"flex"} justifyContent={"space-around"} gap="20px">
          <Text
            fontSize={"3vmin"}
            fontFamily={"SaolDisplay-Regular"}
            fontWeight={"500"}
          >
            TaskDate
          </Text>
          <Input
            onChange={(e) => setdate(e.target.value)}
            value={date}
            w="60%"
            type="text"
          />
        </Box>

 
 {
  sp? <Skeleton height='40px' w='100%'/>:
        <Button
        w="100%"
        onClick={handlecreate}
        fontFamily={"SaolDisplay-Regular"}
        >
          CreateTask
        </Button>
}
      </Box>
    </Box>
  );
}

export default CreateTask
