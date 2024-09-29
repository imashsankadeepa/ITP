import { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import logo from "../css/delete-icon.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/AdminTasks.css";

export default function AdminAllTask() {
  const [tasks, setTasks] = useState([]);
  const [orderIdToDelete, setOrderIdToDelete] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/auth/users/AllTasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDeleteOrder = async () => {
    try {
      const res = await fetch(`/api/user/deletetask/${orderIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("Delete failed:", data.message);
      } else {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== orderIdToDelete)
        );
        setOrderIdToDelete(""); // Reset orderIdToDelete after deletion
        console.log("Task deleted successfully");
      }
      setShowModal(false);
    } catch (error) {
      console.log("Error deleting task:", error.message);
    }
  };

  const handleCompleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, is_complete: true } : task
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="task-list-heading text-2xl font-bold mb-4">
        {" "}
        Adimin All Tasks
      </h2>

      {tasks.length > 0 ? (
        <ul className="task-list grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="task-item bg-white border border-gray-300 rounded-lg shadow-md p-4 flex flex-col"
            >
              <div className="task-item-details mb-4">
                <h4 className="text-lg font-semibold text-gray-800 text-center">
                  {task.task_name}
                </h4>
                <p className="text-sm text-gray-600">
                  <strong className="font-semibold">Staff ID:</strong>{" "}
                  {task.stafffid}
                </p>
                <p className="text-sm text-gray-600">
                  <strong className="font-semibold">Description:</strong>{" "}
                  {task.task_description}
                </p>
                <p className="text-sm text-gray-600">
                  <strong className="font-semibold">Start Date:</strong>{" "}
                  {task.start_date}
                </p>
                <p className="text-sm text-gray-600">
                  <strong className="font-semibold">End Date:</strong>{" "}
                  {task.end_date}
                </p>
              </div>
              <div className="task-action-buttons flex justify-between items-center mt-auto">
                <button
                  className={`status-button ${
                    task.is_complete ? "completed-status" : "pending-status"
                  } text-white py-1 px-3 rounded`}
                  onClick={() => handleCompleteTask(task._id)}
                  style={{
                    backgroundColor: task.is_complete ? "green" : "yellow",
                  }}
                >
                  {task.is_complete ? "Completed" : "Pending"}
                </button>
                <Button
                  onClick={() => {
                    setShowModal(true);
                    setOrderIdToDelete(task._id);
                  }}
                >
                  <img
                    src={logo}
                    alt="delete icon"
                    className="delete-icon-img"
                  />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">You have no tasks yet..!</p>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="modal-content-wrapper text-center ">
            <HiOutlineExclamationCircle
              className="modal-warning-icon ml-40"
              size={48}
            />
            <h3 className="modal-warning-text font-bold mt-2">
              Are you sure you want to delete this Task?
            </h3>
          </div>
          <div className="modal-action-buttons flex justify-between mt-4">
            <Button
              color="danger"
              onClick={handleDeleteOrder}
              className="modal-confirm-button bg-red-600"
            >
              Yes, I am sure
            </Button>
            <Button
              color="secondary"
              onClick={() => setShowModal(false)}
              className="modal-cancel-button"
            >
              No, cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
