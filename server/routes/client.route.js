const express=require("express")
const ClientModel=require( "../models/clientmodel")
const clientsRouter=express.Router();

//search
clientsRouter.get("/search",async(req,res)=>{
    let {client}=req.query;
    console.log(client)
        let user= await ClientModel.find({clientname: new RegExp(client, 'i')})
        res.send({user:user})
    
    })
//get
clientsRouter.get("/:userId",async(req,res)=>{
    const user=req.params.userId
    try{
    var clients= await ClientModel.find({user})
    }catch(err){
        console.log(err)
    }
    res.send(clients)
})

//post

clientsRouter.post("/create/:userId",async(req,res)=>{
    const userId =req.params.userId
const {clientname}=req.body;
const new_client =new ClientModel({
   clientname,
    userId
})
await new_client.save()
res.send({massage:"clients successfully create",new_client})
})

//patch
clientsRouter.patch("/:userId/edit/:clientsId",async(req,res)=>{
    const userId=req.params.userId;
    const clientsId=req.params.clientsId;
    const client= await ClientModel.findOne({_id:clientsId})
    if(client.userId!==userId)
    {
        return res.send("you are not authorized to do it")
    }
    const new_client= await ClientModel.findByIdAndUpdate(clientsId,req.body)
    return res.send("updated")
})

//delete
clientsRouter.delete("/:userId/delete/:clientsId",async(req,res)=>{
    const userId=req.params.userId;
    const clientsId=req.params.clientsId;
    const client= await ClientModel.findOne({_id:clientsId})
 
    const new_client= await ClientModel.findByIdAndDelete(clientsId)
    return res.send("deleted")
})
module.exports=clientsRouter;