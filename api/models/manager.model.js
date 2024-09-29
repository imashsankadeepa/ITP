import mongoose from "mongoose";

const ManagerSchema =new mongoose.Schema({
    username:{
        type:String,
       
       
    },
    email:{
        type:String,
     
       
    },
    password:{
        type:String,
     
     
    },
   
},{timestamps:true});

const Manager=mongoose.model("ADMIN",ManagerSchema)

export default Manager;