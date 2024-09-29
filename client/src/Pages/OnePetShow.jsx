import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './css/OnePetShow.css'

function OnePetShow() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updatediscount, setupdatediscount] = useState({
    petname: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    color: "",
    weight: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/getitem/${id}`);
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
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/user/updateitem`, {
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
        console.log('User updated successfully');
       
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-4 text-center">{updatediscount.petname}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Species:</label>
          <p className="text-gray-900">{updatediscount.species}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Breed:</label>
          <p className="text-gray-900">{updatediscount.breed}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Age:</label>
          <p className="text-gray-900">{updatediscount.age}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Gender:</label>
          <p className="text-gray-900">{updatediscount.gender}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Color:</label>
          <p className="text-gray-900">{updatediscount.color}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Weight:</label>
          <p className="text-gray-900">{updatediscount.weight}</p>
        </div>
        <div className="text-center">
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnePetShow;
