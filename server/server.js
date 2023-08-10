// 0xdb586e1091210191d10f27c16fb6fdb8ee4e6fe2;
const express = require('express');
const ABI = require("./ABI.json");
const cors = require('cors');
const { Web3 } = require("web3");

const app = express(); 
app.use(cors()); 
app.use(express.json());

const web3 = new Web3(
  "https://bitter-winter-brook.ethereum-sepolia.discover.quiknode.pro/556e4f487493f9fcfd1459fe81dc81c159bc84fb/"
);
const contractAddress = "0x70dE2ffbe543965FDbb6CF160700466d4DdfFB04";

const contract = new web3.eth.Contract(ABI,contractAddress);
const taskpresent = async(taskDate)=>{
   const task = await contract.methods.allTask().call();
   const ftask = task.find(task=>task.date===taskDate); 
   if(ftask){
    return ftask.name; 
   }
   return "No Task Found"
}

// app.post('/eth/update-task',async(req,res)=>{
//    try {
//    await contract.methods .updateTask(req.body.id, req.body.name, req.body.date).call();
//        return res.status(201).json({ success: true }); 
//    } catch (error) {
//     res.status(500).json("Internal Server Error");
//    }
// })

// app.post("/eth/delete-task", async (req, res) => {
//   try {
//     console.log(req.body.id);
//     await contract.methods.deleteTask(req.body.id).call();
//     return res.status(201).json({ success: true });
//   } catch (error) {
//     res.status(500).json("Internal Server Error");
//   }
// });

app.post('/eth/create-task',async(req,res)=>{
  try {
    const {taskDate} = req.body; 
    const fd = await taskpresent(taskDate);
    if (fd === "No Task Found") {
      return res.status(201).json({success:true});
    }
    return res.status(201).json({success:false,task:fd});
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
})

app.get("/eth/view-allTask", async (req, res) => {
  try {
    const task = await contract.methods.allTask().call();
    if(task.length>0){
       const ntask = task.map(({id,name,date})=>{
        const taskid = Number(id); 
        return {taskid,name,date}
       })
        res.status(201).json({success:true,ALLTASK:ntask});
    }
    else{
        res.status(404).json({success:false,message:"No Task Exist"});
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");

  }
});


// app.get("/eth/view-Task/:id", async (req, res) => {
//   try {
//     const {id} = req.params;
//     const task = await contract.methods.viewTask().call();
//     if (task.length > 0) {
//       const ntask = task.map(({ id, name, date }) => {
//         const taskid = Number(id);
//         return { taskid, name, date };
//       });
//       res.status(201).json({ ALLTASK: ntask });
//     } else {
//       res.status(404).json("No Task Exist");
//     }
//   } catch (error) {
//     res.status(500).json("Internal Server Error");
   
//   }
// });


app.listen(4000,()=>{
    console.log('server is running');
})







//smart Contract
//SPDX-License-Identifier:MIT
// pragma solidity ^0.8.19;

// contract todo{
//     struct Task{
//         uint id ;
//         string name ;
//         string date; 
//     }
//     address owner;
//     Task task; 
//     mapping (uint=>Task) tasks;
//     uint taskId =1; 
//     modifier checkId(uint id){
//         require(id!=0 && id<taskId, "Invalid Id");
//         _; 
//     }
//     constructor(){
//         owner=msg.sender; 
//     }
//     function createTask(string calldata _taskname,string calldata _date) public {
//         tasks[taskId]=Task(taskId,_taskname,_date); 
//         taskId++; 
//     }
//     function updateTask(uint _taskId, string calldata _taskName,string calldata _date)
//        checkId(_taskId) public 
//        { 
//         tasks[_taskId] = Task(_taskId,_taskName,_date);
//     }

//     function allTask() public view  returns(Task[] memory){
//         Task[] memory taskList = new Task[](taskId-1); 
//         for(uint i = 0; i<taskId-1;i++){
//             taskList[i] = tasks[i+1]; 
//         }
//         return taskList; 
//     } 
//     function viewTask(uint _taskId) checkId(_taskId) public view  returns(Task memory){
//         return tasks[_taskId]; 
//     }
//     function deleteTask(uint _taskId) checkId(_taskId) public {
//         delete tasks[_taskId]; 
//     }
// }


// 0xDb586E1091210191D10F27C16Fb6fdb8eE4e6fe2
