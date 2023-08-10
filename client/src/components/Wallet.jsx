import { Box,Button } from '@chakra-ui/react'
import React from 'react'
import {Web3} from 'web3';
import ABI from './ABI.json';
import { useNavigate } from 'react-router-dom';
const Wallet = ({setp}) => {
  const navigate = useNavigate(); 
  const connectwithmt = async()=>{
    try {
      if(window.ethereum){
        const web3 = new Web3(window.ethereum);
        const  accounts = await window.ethereum.request({
          method:"eth_requestAccounts"
        });
        const contractAddress = "0x70dE2ffbe543965FDbb6CF160700466d4DdfFB04";
        const contract = new web3.eth.Contract(ABI, contractAddress);
         setp({web3:web3,contract:contract,account:accounts[0]});
        navigate("/alltask");
      }
      else{
        alert('No metaMask Present');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box w="100vw" h="100%" alignItems={'center'} justifyContent={'center'} display={'flex'}>
      <Button onClick={connectwithmt} >Connect with Metamask</Button>
    </Box>
  );
}

export default Wallet
