import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {getStorage, uploadBytesResumable,ref, getDownloadURL} from 'firebase/storage'
import {app} from '../../firebase.js';
import { useDispatch } from 'react-redux';
import '../../Pages/css/profile.css'
import { updateUserStart,updateUserFailure, updateUserSuccess, deleteUserStart,deleteUserSuccess,deleteUserFailure, signout } from '../../redux/User/userSlice'


export default function ManagerProfile() {
  const dispatch=useDispatch()
  const fileRef=useRef(null);
  const [image,setImage]=useState(undefined);
  const [imagePercent,setImagePercent]=useState(0);
  const [imageError,setImageError]=useState(false);
  const [formData,setFormData]=useState({});
  const [updateSuccess,setuodateSuccess]=useState(false)

 
    const {currentUser,loading,error}=useSelector((state)=>state.user)
    useEffect(()=>{
      if(image){
        handleFileUpload(image)
          }
      },[image]);

      const handleFileUpload=async (image)=>{
        const storage=getStorage(app)
        const fileName=new Date().getTime()+image.name;
        const storageRef=ref(storage,fileName)
        const uploadTask=uploadBytesResumable(storageRef,image)

        uploadTask.on('state_changed',
          (snapshot)=>{
          const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
          setImagePercent(Math.round(progress))
          
    },
  
    (error)=>{
      setImageError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL)=>setFormData({ ...formData, 
        profilePicture:downloadURL}))

      }
    
   )
  };

  const handlechange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }



  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res=await fetch(`/api/user/update_manager/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData,)
      });
      const data=await res.json();
      if(data.success===false){
          dispatch(updateUserFailure(data));
          return
      }
      dispatch(updateUserSuccess(data));
      setuodateSuccess(true)
    }catch(error){
      dispatch(updateUserFailure(error));
    }
  };



  const handledeleteAccount =async ()=>{
    try{
      dispatch(deleteUserStart())
        const res=await fetch(`/api/user/delete_manager/${currentUser._id}`,{

        method:'DELETE',
        })
        const data=await res.json();
        if(data.success===false){
          dispatch(deleteUserFailure(data))
          return;
        }
        dispatch(deleteUserSuccess(data))
        alert('user deleted successfully')
    }catch(error){
        dispatch(deleteUserFailure(error))
    }
  }


  const handleSignOut=async ()=>{
    try{

      await fetch('api/auth/manager_signout')
      dispatch(signout())
    }catch(error){
        console.log(error)
    }
  }
  return (

    <div className='user-profile'>
      <h1 className='user-profile-name'>Manager Profile</h1>
      <form  onSubmit={handleSubmit}className='user-profile-form' >
        <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e)=>setImage(e.target.files[0])}></input>

          {/*allow read;
                allow write:if
                request.resource.size < 2 * 1024 * 1024 &&
                request.resource.contentType.matches('image/.*')*/}

      <img src={formData.m_profilePicture||currentUser.m_profilePicture} alt='profile' className=''

      onClick={()=>fileRef.current.click()}></img>

      <p className='user-profile-emage uploading error'>
            {imageError ?(
              <span className=''>Error uploading image (file size must be less than 2 MB)</span>
            ):imagePercent>0&&imagePercent<100?(
              <span className=''>{`uploading:${imagePercent} %`}</span>
            ):imagePercent===100?(
              <span className=''>Image uploaded successfully</span>
            ):(
              ''
            )}

      </p>

      <input defaultValue={currentUser.username} type='text' id='username' placeholder='Username' className='user-profile-username' onChange={handlechange}></input>
      <input defaultValue={currentUser.email} type='email' id='email' placeholder='Email' className='user-profile-email' onChange={handlechange}></input>
      <input type='password' id='password' placeholder='Manager password' className='user-profile-password' onChange={handlechange}></input>

      <button className=''>{loading ? 'loading...':'update'}</button>

      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handledeleteAccount} className='user-profile-delete-button'>Close Account</span>
        <span onClick={handleSignOut}className='user-profile-signout-button'>Sign Out</span>
        <Link className='navigate-button-additem' to='/AddStaff'><li>Add Shedule</li></Link> 
        <Link className='my-items-button' to='/StaffDetailsProfile'><li>My Details</li></Link> 
      </div>
        <p className='user-profile-errors-button'>{error && 'Something went wrong'}</p>
        <p className='user-profile-update-success-button'>{updateSuccess  && 'user  updated successfully'}</p>
     
    </div>
  )
}
