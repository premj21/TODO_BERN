import { Box ,Text,Button, useToast, Spinner,Input} from '@chakra-ui/react'
import React, { useState }  from 'react'

const ShowcaseTask = ({item,index,p,setld}) => {
  const [name,setname] = useState(item.name); 
  const [date,setdate]= useState(item.date);
  const [ldr,setldr] = useState(false);
  const [dsp,setdsp] = useState(false);
     const [pt,setpt] = useState(false);
    const toast = useToast();
     const { contract, account } = p;
   const handleUpdate = async(e)=>{
    e.preventDefault(); 
       try {
        if(name==='' || date ===''){
              toast({
                title: "Missing Information",
                description: "Fill the information Correctly",
                status: "error",
                duration: 2000,
                isClosable: true,
              });
              return;
        }
        setldr(true);
         setld(true);
         await contract.methods.updateTask(index + 1,name,date).send({ from: account });
         toast({
           title: "TaskUpdate Operation",
           description: "Task has been updated successfully",
           status: "success",
           duration: 2000,
           isClosable: true,
         });
        
         setldr(false);
         setld(false);
       } catch (error) {
         setldr(false);
         setdsp(false);
        toast({
          title: "Error",
          description: "Internal Server Error",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
       }
    }

     const handledelete = async ({ index }) => {
       console.log(index);
       try {
         setld(true);
         setpt(true);
         await contract.methods.deleteTask(index + 1).send({ from: account });
         setld(false);
         setpt(false);
         toast({
           title: "Deletion Operation",
           description: "Task has been deleted successfully",
           status: "success",
           duration: 2000,
           isClosable: true,
         });
       } catch (error) {
         setld(false);
          setpt(false);
         toast({
           title: "Error",
           description: "Internal Server Error",
           status: "error",
           duration: 2000,
           isClosable: true,
         });
       }
     };
  return (
    <>
      <Box
        w="60vw"
        h={"60%"}
        p="3rem"
        boxShadow={"0px 5px 20px rgba(0, 0, 0, 0.065)"}
        display={dsp ? "flex" : "none"}
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
        <Box w="100%" display={"flex"} gap='10%'>
            {
                ldr?<Spinner
              thickness="4px"
              speed="1s"
              emptyColor="gray.200"
              color="blue.500"
              size="l"
            />:
          <Button onClick={handleUpdate} w="45%" fontFamily={"SaolDisplay-Regular"} fontWeight={"500"}>
            Update
          </Button>
            }
          <Button
            w="45%"
            onClick={() => setdsp(false)}
            fontFamily={"SaolDisplay-Regular"}
            fontWeight={"500"}
          >
            Cancel
          </Button>
        </Box>
      </Box>
      <Box
        maxW="70%"
        w="70%"
        minH="7vh"
        overflowX={"scroll"}
        display={dsp === false ? "flex" : "none"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        gap="15%"
      >
        <Box w="100%" display={"flex"} gap="10%">
          <Text
            fontSize={"3vmin"}
            fontFamily={"SaolDisplay-Regular"}
            fontWeight={"500"}
          >
            {index + 1} :
          </Text>
          <Text
            fontSize={"3vmin"}
            fontFamily={"SaolDisplay-Regular"}
            fontWeight={"500"}
          >
            {`${item.name}=>`}
          </Text>
          <Text
            fontSize={"3vmin"}
            fontFamily={"SaolDisplay-Regular"}
            fontWeight={"500"}
          >
            {item.date}
          </Text>
        </Box>

        <Box w="auto" display={dsp === false ? "flex" : "none"} gap="10%">
          {pt === true ? (
            <Spinner
              thickness="4px"
              speed="1s"
              emptyColor="gray.200"
              color="blue.500"
              size="l"
            />
          ) : (
            <Button
              fontFamily={"SaolDisplay-Regular"}
              onClick={() => handledelete({ index })}
              fontWeight={"500"}
            >
              Delete
            </Button>
          )}
          <Button
            onClick={() => setdsp(true)}
            fontFamily={"SaolDisplay-Regular"}
            fontWeight={"500"}
          >
            Update
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default ShowcaseTask
