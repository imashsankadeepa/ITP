import {useEffect, useState,useRef} from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './css/UpdateStaff.css';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';



function UpdateStaff(){
  const [imagePercent, setImagePercent] = useState(0);
    const navigate=useNavigate();
    const { id } = useParams();
    const fileRef1 = useRef(null);
 
    const [image1, setImage1] = useState(undefined);
    
    const [updatediscount,setupdatediscount]=useState({
      staffId: "",
      firstName: "",
      lastName: "",
      emaill: "",
      phoneNumber: "",
      department: "",
      position:"",
      assignedShifts: "",
      workSchedule: "",
      profilePicture: "",
   
        
        
    })
    useEffect(() => {
      if (image1) {
        handleFileUpload(image1, 'profilePicture');
      }
    }, [image1]);
  
   
    const handleFileUpload = async (image, field) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImagePercent(Math.round(progress));
        },
        (error) => {
          setImageError(true);
          setError('Image upload failed');
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setupdatediscount((prev) => ({
              ...prev,
              [field]: downloadURL
            }));
          });
        }
      );
    };
  
    const handleImage1Click = () => {
      fileRef1.current.click();
    };
  
   
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`/api/user/getStaff/${id}`);
            const data = await response.json();
            console.log(data);
    
            if (data.success) {
                setupdatediscount(data.data);
            } else {
              console.error(data.message);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);



      const handleInputChange = (e) => {
        setupdatediscount({
          ...updatediscount,
          [e.target.name]: e.target.value,
        });
      };
      const handleUpdate = async () => {
        try {
          const response = await fetch(`/api/user/updateStaff`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: updatediscount._id,
              ...updatediscount,
            }),
          });
    
          const data = await response.json();
    
          if (data.success) {
            
            console.log('user  updated successfully');

       

          } else {
            console.error(data.message);
          }
          alert('Updated Successfully')
         navigate('/StaffDetailsProfile')
        } catch (error) {
          console.error('Error updating user:', error);
        }
      };

     
    return(
        <div className='staff-update-form'> 
 <h1 id="main-topic of form">Update Working Shedule</h1>
 <h1 id="sub-first-topic of form">Basic Information</h1>
   <input type="text" placeholder='staffId'  name='staffId' onChange={handleInputChange} value={updatediscount?.staffId }readOnly />
        <input type="text" placeholder='firstName'   name='firstName' onChange={handleInputChange} value={updatediscount?.firstName }/>
        <input type="text" placeholder='lastName'  name='lastName' onChange={handleInputChange} value={updatediscount?.lastName } />
        <input type="text" placeholder='emaill'   name='emaill' onChange={handleInputChange} value={updatediscount?.emaill } />
        <input type="text" placeholder='phoneNumber'   name='phoneNumber' onChange={handleInputChange} value={updatediscount?.phoneNumber } />
        <h1 id="sub-second-topic of form">Work Information</h1>
        <input type="text" placeholder='department'    name='department'onChange={handleInputChange} value={updatediscount?.department } />
        <input type="text" placeholder='position'   name='position'onChange={handleInputChange} value={updatediscount?.position }/>
        <h1 id="sub-third-topic of form">Schedule Management</h1>
        <input type="text" placeholder='assignedShifts'  name='assignedShifts' onChange={handleInputChange} value={updatediscount?.assignedShifts } />
        <input type="text" placeholder='workSchedule'   name='workSchedule'onChange={handleInputChange} value={updatediscount?.workSchedule }/>
    

        <input type='file' ref={fileRef1} id='profilePicture'   name='profilePicture' hidden accept='image/*' onChange={(e) => setImage1(e.target.files[0])} />
      


        <div className='flex justify-center items-center gap-4'>
          <img onChange={handleInputChange} value={updatediscount?.profilePicture } src={updatediscount.profilePicture || 'https://media.istockphoto.com/id/1294866141/vector/picture-reload.jpg?s=612x612&w=is&k=20&c=Ei6q4n6VkP3B0R30d1VdZ4i11CFbyaEoAFy6_WEbArE='} alt='Profile' className='h-20 w-20 self-center cursor-pointer object-cover border border-gray-300' onClick={handleImage1Click} />
        
        </div>

    


  



  
    <button className='update-btn' onClick={handleUpdate}>Update Staff Details</button><br></br> <br></br> 

 
        </div>
    )
}
export default UpdateStaff;