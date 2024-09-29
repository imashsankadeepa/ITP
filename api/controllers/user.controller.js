import User from "../models/user.model.js"
import Staff from "../models/Staff.model.js"
import Task from "../models/Task.model.js"
import Manager from '../models/manager.model.js'
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs';

export const test=(req,res)=>{
    res.json({
        message:'API is working'
    })
}

export const updateUser=async (req,res,next)=>{
    if(req.user.id!==req.params.id){
        return next(errorHandler(401,'you can update only your account!'))

    }
    try{
        if(req.body.password){
            req.body.password=bcryptjs.hashSync(req.body.password,10)
        }

        const updateUser=await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    address:req.body.address,
                    profilePicture:req.body.profilePicture,
                },
            },
            {new:true}
        );
        const {password, ...rest}=updateUser._doc;
        res.status(200).json(rest)
    }catch(error){
        next(error)
    }
}

export const deleteUser=async(req,res,next)=>{
    if(req.user.id !==req.params.id){
        return next(errorHandler(401,'you can delete only ypur account'));

    }try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('user has been deleted....')
    }catch(error){
        next(error)

    }
}






//Manager
export const update_manager=async (req,res,next)=>{
    if(req.user.id!==req.params.id){
        return next(errorHandler(401,'you can update only your account!'))

    }
    try{
        if(req.body.password){
            req.body.password=bcryptjs.hashSync(req.body.password,10)
        }

        const updateManager=await Manager.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    username:req.body.manager_username,
                    email:req.body.manager_email,
                    password:req.body.manager_password,
                    m_profilePicture:req.body.m_profilePicture,
                },
            },
            {new:true}
        );
        const {manager_password, ...rest}=updateManager._doc;
        res.status(200).json(rest)
    }catch(error){
        next(error)
    }
}

export const delete_manager=async(req,res,next)=>{
    if(req.user.id !==req.params.id){
        return next(errorHandler(401,'you can delete only ypur account'));

    }try{
        await Manager.findByIdAndDelete(req.params.id)
        res.status(200).json('user has been deleted....')
    }catch(error){
        next(error)

    }
}






//Staff

export const test1 = (req, res) => {
    res.json({
        message: 'API is working'
    });
}


export const updateStaff =async(req,res)=>{
    const {id,...rest}=req.body
    const data=await Staff.updateOne({_id:id},rest)
    res.send({success:true,message:"updated successfuly",data:data})
}

export const deleteStaff = async (req, res, next) => {
    let petId=req.params.id;
    console.log(petId)
    try {
        await Staff.findByIdAndDelete(petId);
        res.status(200).json('The Order has been deleted');
    } catch (error) {
        next(error);
    }
}




export const getStaff= async (req, res) => {
    const id = req.params.id;

    try {
        const discount = await Staff.findById(id);

        if (!discount) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "User fetched successfully", data: discount });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
};



//Task delete  
export const deletetask = async(req,res)=>{
    const id=req.params.id
    const data=await Task.deleteOne({_id:id})
    res.send({success:true,message:"deleted successfully",data:data})
}
    


export const getTask= async (req, res) => {
    const id = req.params.id;

    try {
        const discount = await Task.findById(id);

        if (!discount) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "User fetched successfully", data: discount });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
};

export const updateTask =async(req,res)=>{
    const {id,...rest}=req.body
    console.log(rest);
    
    const data=await Task.updateOne({_id:id},rest);
    res.send({success:true,message:"updated successfuly",data:data})
}
