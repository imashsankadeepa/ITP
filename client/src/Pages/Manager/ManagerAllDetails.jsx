import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebase';
import '../css/Alldetails.css';
import logo from '../css/delete-icon.png';

export default function ManagerAllDetails() {
  const [orders, setOrders] = useState([]);
  const [orderIdToDelete, setOrderIdToDelete] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/auth/users/AllStaff`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);

      // Fetch images from Firebase for each order
      data.forEach(order => {
        if (order.profilePicture) {
          fetchFirebaseImage(order.profilePicture, 'profilePicture', order._id);
        }
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchFirebaseImage = async (imageUrl, field, orderId) => {
    const storageRef = ref(storage, imageUrl);
    try {
      const downloadUrl = await getDownloadURL(storageRef);
      setOrders(prevOrders => prevOrders.map(order => {
        if (order._id === orderId) {
          return {
            ...order,
            [field]: downloadUrl
          };
        }
        return order;
      }));
    } catch (error) {
      console.error(`Error fetching image from Firebase for ${field}:`, error);
    }
  };

  const handleDeleteOrder = async () => {
    try {
      const res = await fetch(`/api/user/deleteStaff/${orderIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log('Delete failed:', data.message);
      } else {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderIdToDelete)
        );
        setOrderIdToDelete('');
        console.log('Order deleted successfully');
      }
      setShowModal(false);
    } catch (error) {
      console.log('Error deleting order:', error.message);
    }
  };

  return (
    <div className="p-4">
      <div id="admin-page-names" className="flex justify-between mb-4">
        <h2 id='allstafftopic'>All Staff Members</h2>
        <Link id="add-task-page-btn" to="/AdminAllTask">
          All Task
        </Link>
        <Link id="all-task-page-btn" to="/AddTask">
          Add Task
        </Link>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="card bg-white shadow-lg rounded-lg p-6">
              <div className="card-header flex items-center justify-between">
                <h3 className="text-xl font-bold">{order.firstName} {order.lastName}</h3>
                <Button
                  id="card-delete-btn"
                  onClick={() => {
                    setShowModal(true);
                    setOrderIdToDelete(order._id);
                  }}
                  className="delete-button"
                >
                  <img src={logo} alt="Delete" width="20" height="20" />
                </Button>
              </div>
              <div className="card-body">
                <p><strong>Staff ID:</strong> {order.staffId}</p>
                <p><strong>Email:</strong> {order.emaill}</p>
                <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
                <p><strong>Department:</strong> {order.department}</p>
                <p><strong>Position:</strong> {order.position}</p>
                <p><strong>Assigned Shifts:</strong> {order.assignedShifts}</p>
                <p><strong>Work Schedule:</strong> {order.workSchedule}</p>
                {order.profilePicture && (
                  <img src={order.profilePicture} alt="Profile" className="h-20 w-20 object-cover rounded mt-4" />
                )}
              </div>
            </div>
          ))
        ) : (
          <p>You have no orders yet!</p>
        )}
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-2 text-4xl text-red-600" />
            <h3>Are you sure you want to delete this Staff Member?</h3>
            <div className="modal-button-group flex justify-center gap-4 mt-4">
              <Button color="failure" onClick={handleDeleteOrder}>
                Yes, I am sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
