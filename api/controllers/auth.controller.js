import User from "../models/user.model.js";
import Manager from '../models/manager.model.js'
import Task from '../models/Task.model.js'
import Staff from "../models/Staff.model.js";
import bcryptjs from 'bcryptjs';
import  bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'
import bodyParser from "body-parser";
import nodemailer from 'nodemailer';
import  express from "express";
const router = express.Router();
router.use(bodyParser.json());


//register
export const signup=async(req,res,next)=>{
    const {username,email,address,password}=req.body;
    const hashPassword=bcryptjs.hashSync(password,10)
    const newUser=new User({username,email,address,password:hashPassword});
    try{
        await newUser.save();
        res.status(201).json({message:"user created successfully"});
    }catch(error){
        next(error);
    }
   
}
//login 
export const signin =async(req,res,next)=>{
    const{email,password}=req.body
    try{
        const validUser=await User.findOne({email})
        if(!validUser) return next(errorHandler(404,'user not found'));
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword) return next(errorHandler(401,'wrong credentials'))
            const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const{password:hashedPassword,...rest}=validUser._doc;

        const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day from now
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);

    }catch(error){
        next(error)
    }
}

//MAMANGER REGSTER
export const manager_signup =async(req,res)=>{
    const data=new Manager(req.body)
    await data.save()
    res.send({success:true,message:"data created successfuly"})
}


////MANAGER Login 
export const manager_signin = async (req, res) => {
    console.log('in-------------------------------');
    const { email, password } = req.body;
  
    try {
        console.log(email);  
      const user = await Manager.findOne({ email});
      
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
    
     // const isPasswordValid = await bcrypt.compare(password, user.password);
     const isPasswordValid1 = user.password===password;

      console.log('Input password:', password);
      console.log('Stored hashed password:', user.password);
      console.log('isPasswordValid:', isPasswordValid1);
      
      if (isPasswordValid1===false) { // Fixed condition
        console.log('Request body:', req.body);
        return res.status(401).json({ success: false, message: "Incorrect password" });
      

      }
  
      // If password is valid, send success message and user data
      res.status(200).json({ success: true, message: "Login successful", data: user });
    } catch (error) {
        console.log('Retrieved user:', user);

      console.error("Login error:", error);
      res.status(500).json({ success: false, message: error });
    }
};

// Define your endpoint for sending emails
export const manager_send_email = async (req, res) => {
    try {
      const { email } = req.body;
  
     console.log(email+"==========================");
  
      // Create a Nodemailer transporter
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ruwanyahettiarachchi@gmail.com',
          pass: 'ltzn jamh brzq tkap'
        }
      });
  
      // Send a thank you email
      await transporter.sendMail({
        from: 'ruwanyahettiarachchi@gmail.com',
        to: email,
        subject: 'Thank You!',
        text: 'Thank you '
      });
  
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };













//staff shedules
export const AddStaff=async(req,res,next)=>{
    const {userId,staffId,firstName,lastName,emaill,phoneNumber,department,position, assignedShifts, workSchedule,profilePicture}=req.body;

    //create auto id for orderid
    function idGen(userId){
        const randomString=Math.random().toString(36).substring(2,10);
        const id='ORD'+randomString+userId;
        return id;
    }
    const petId=idGen(userId)
   

    const newStaff=new Staff({petId,userId, staffId,firstName,lastName,emaill,phoneNumber,department,position, assignedShifts, workSchedule,profilePicture});
    try{
        await newStaff.save();
        res.status(202).json({message:"staff created successfully"});
    }catch(error){
        next(error);
    }
   
}

//get items by userid
export const getStaffByUserId = async (req, res, next) => {
    try{
       const customerId=req.params.id;
        const orders=await Staff.find({userId:customerId})
        res.json(orders)
    }catch(error){
        console.log(error)
        res.status(500).json({error:'Internal server error'})
    }
};


//all items
export const AllStaff = async (req, res, next) => {
    try{
    
        const orders=await Staff.find({})
        res.json(orders)
    }catch(error){
        console.log(error)
        res.status(500).json({error:'Internal server error'})
    }
};












//TASK
export const AddTASK = async (req, res) => {
    try {
        const data = new Task(req.body);
        await data.save();
        res.status(201).json({ success: true, message: "Task created successfully" });
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ success: false, message: "Error creating task" });
    }
};


//all Tasks
export const AllTasks = async (req, res, next) => {
    try{
    
        const orders=await Task.find({})
        res.json(orders)
    }catch(error){
        console.log(error)
        res.status(500).json({error:'Internal server error'})
    }
};


export const google=async(req,res,next)=>{
    try{
        const user=await User.findOne({email:req.body.email})

        if(user){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password:hashedPassword, ...rest}=user._doc;
            const expiryDate=new Date(Date.now() + 24 * 60 * 60 * 1000);
            res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json(rest);
       
        }else{
            const generatedPassword=
            Math.random().toString(36).slice(-8)+
            Math.random().toString(36).slice(-8)

            const hashedPassword=bcryptjs.hashSync
            (generatedPassword,10);

            const newUser=new User({username:req.body.name.split(' ').join('').toLowerCase()+
                Math.random().toString(36).slice(-8),
                email:req.body.email,password:hashedPassword,profilePicture:req.body.photo,
            });
            await newUser.save();
            const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const {password:hashedPassword2, ...rest}=newUser._doc;
            const expiryDate=new Date(Date.now() + 24 * 60 * 60 * 1000);
            res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json(rest);


        }
    }catch(error){
        next(error)
    }
}






export const signout=(req,res)=>{
    res.clearCookie('access_token').status(200).json('Signout Success')
}

