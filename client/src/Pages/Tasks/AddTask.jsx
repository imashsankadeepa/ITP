import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import addtask from "../../Images/addtask.png";

const AddTask = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    stafffid: "",
    task_name: "",
    task_description: "",
    start_date: "",
    end_date: ""
  });

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
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch staff members');
    }
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setOrder(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/AddTASK', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to create task');
      }

      toast.success('Task successfully created', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        navigate('/AdminAllTask');
      }, 3000);
    } catch (error) {
      console.error('Error creating task:', error.message);
      toast.error('Failed to create task: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center lg:items-start">
        {/* Left side image */}
        <div className="w-full lg:w-1/2  lg:mb-0 flex justify-center lg:justify-start">
          <img src={addtask} alt="Task Management" />
        </div>

        {/* Right side form */}
        <div className="w-full lg:w-1/2 lg:pl-8 mb-8">
        <ToastContainer />
          <div className="bg-white p-8 rounded-xl shadow-md max-w-md mx-auto ml-72">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Add Task</h2>
            <form className="space-y-6 ml-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="stafffid" className="block text-sm font-medium text-gray-700">Staff Id</label>
                <select
                  id="stafffid"
                  name="stafffid"
                  onChange={handleOnChange}
                  value={order.stafffid}
                  required
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Staff Id</option>
                  {orders.map((staff) => (
                    <option key={staff._id}>{staff.staffId}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="task_name" className="block text-sm font-medium text-gray-700">Task Name</label>
                <input
                  id="task_name"
                  name="task_name"
                  type="text"
                  placeholder="Add name"
                  required
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label htmlFor="task_description" className="block text-sm font-medium text-gray-700">Task Description</label>
                <input
                  id="task_description"
                  name="task_description"
                  type="text"
                  placeholder="Add Description"
                  required
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  id="start_date"
                  name="start_date"
                  type="date"
                  required
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  id="end_date"
                  name="end_date"
                  type="date"
                  required
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send Task to Member
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTask;