import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/UpdateTask.css';

function UpdateTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    stafffid: "",
    task_name: "",
    task_description: "",
    start_date: "",
    end_date: "",
     status: ""

  });

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await fetch(`/api/user/getTask/${id}`);
        const data = await response.json();
        if (data.success) {
          setTask(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchTaskData();
  }, [id]);

  const handleInputChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      task.is_complete=true;
      const response = await fetch(`/api/user/updateTask`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: task._id,
          ...task,
          status: 'completed', // Update task status to completed
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Task Completed Successfully');
        navigate('/AllTask'); // Redirect back to AllTask after update
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className='task-update-form'>
      <h1 id="task-main-topic-of-form">Update Working Schedule</h1>

      <label htmlFor="stafffid">Staff Id:</label>
      <input type="text" id="stafffid" name="stafffid" onChange={handleInputChange} value={task?.stafffid} readOnly />

      <label htmlFor="task_name">Task Name:</label>
      <input type="text" id="task_name" name="task_name" onChange={handleInputChange} value={task?.task_name}  />

      <label htmlFor="task_description">Task Description:</label>
      <input type="text" id="task_description" name="task_description" onChange={handleInputChange} value={task?.task_description}  />

      <label htmlFor="start_date">Start Date:</label>
      <input type="date" id="start_date" name="start_date" onChange={handleInputChange} value={task?.start_date} />

      <label htmlFor="end_date">End Date:</label>
      <input type="date" id="end_date" name="end_date" onChange={handleInputChange} value={task?.end_date} />

      <button className='update-btn' onClick={handleUpdate}>Complete My Task</button>
    </div>
  );
}

export default UpdateTask;
