import express from 'express'
import { test, updateUser,deleteUser,updateStaff,deleteStaff,getStaff,update_manager,delete_manager ,deletetask,getTask,updateTask} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router=express.Router();


router.get('/',test)
router.post("/update/:id",verifyToken,updateUser)
router.delete("/delete/:id",verifyToken,deleteUser)


router.post("/update_manager/:id",verifyToken,update_manager)
router.delete("/delete_manager/:id",verifyToken,delete_manager)



//sataff
router.delete("/deleteStaff/:id",deleteStaff)
router.get('/getStaff/:id', getStaff);//for update fetch data
router.put("/updateStaff",verifyToken,updateStaff)


//task
router.delete("/deletetask/:id",deletetask)
router.get('/getTask/:id', getTask);//for update fetch data
router.put("/updateTask",updateTask)





export default router