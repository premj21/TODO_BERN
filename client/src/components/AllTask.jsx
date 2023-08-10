/* eslint-disable no-lone-blocks */
import { Box} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Skeleton } from '@chakra-ui/react'
import ShowcaseTask from './ShowcaseTask';

const AllTask = ({p}) => {

  const [alltask, setalltask] = useState([]); 
  const [ld ,setld] =useState(false);
  useEffect(()=>{

  const alltask = async()=>{

    try {
    const { data } = await axios.get(
      `http://localhost:4000/eth/view-allTask`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if(data.success ===true)
   { setalltask(data.ALLTASK);
  }
  else {
   { setalltask([{name:'No Task Available'}]) }
  }
  } catch (error) {
     console.log(error.message);
}
  }

  alltask();
  },[ld])
  return (
    <Box
      w="100vw"
      h="95vh"
      overflowY={"scroll"}
      display={"flex"}
      flexDir={"column"}
      p="4rem"
      alignItems={"center"}
      justifyItems={"center"}
    >
      {alltask !== null ? (
        alltask.map((item, index) => {
          return item.name.length<1?null:
          <>
            <ShowcaseTask item={item} index={index} p={p}setld={setld}/>
        </>
        }

      )
      ) : (
        <Box
          w="60%"
          flexDir={"column"}
          gap="20px"
          minH="7vh"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Skeleton
            startColor="blackAlpha.200"
            endColor="blackAlpha.400"
            height="20px"
            w="80%"
            h="6vh"
          />
          <Skeleton
            startColor="blackAlpha.200"
            endColor="blackAlpha.400"
            height="20px"
            w="80%"
            h="6vh"
          />
          <Skeleton
            startColor="blackAlpha.200"
            endColor="blackAlpha.400"
            height="20px"
            w="80%"
            h="6vh"
          />
        </Box>
      )}
    </Box>
  );
}

export default AllTask
