import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import {
  FaSyncAlt,
  FaTasks,
  FaPlusCircle,
  FaSignOutAlt,
  FaUserTimes,
  FaSignInAlt,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signout,
} from "../redux/User/userSlice";

export default function Header() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handledeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
      alert("User deleted successfully");
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("api/auth/signout");
      dispatch(signout());
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-800 text-white shadow-md">
      <div className="flex justify-between items-center py-4 px-6">
        {/* Website Name */}
        <h1 className="text-xl font-semibold">Task Management</h1>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-6">
          <Link to="/">
            <li className="hover:text-blue-400 transition">Home</li>
          </Link>
          <Link to="/manager-sign-in">
            <li className="hover:text-blue-400 transition">Manager Sign In</li>
          </Link>
          <Link to="/about">
            <li className="hover:text-blue-400 transition">About</li>
          </Link>

          {/* Dropdown Menu for User Profile */}
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="w-10 h-10 rounded-full overflow-hidden shadow-lg cursor-pointer">
              {currentUser && currentUser.profilePicture ? (
                <img
                  src={currentUser.profilePicture}
                  alt="Profile"
                  className="h-full w-full"
                />
              ) : (
                <div className="flex justify-center items-center transition relative">
                  <FaUser className="mr-2 text-xl" />{" "}
                </div>
              )}
            </Menu.Button>

            {/* Transition for the dropdown */}
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-4 px-6">
                  {/* User Profile Info */}
                  {currentUser && Object.keys(currentUser).length > 0 ? (
                    <div className="text-center space-y-2">
                      {/* Profile Picture */}
                      <img
                        src={currentUser.profilePicture}
                        className="h-16 w-16 mx-auto rounded-full object-cover shadow-md"
                        alt="Profile"
                      />
                      {/* User Info */}
                      <h1 className="text-lg font-semibold text-gray-900">
                        {currentUser.username}
                      </h1>
                      <p className="text-sm text-gray-600">
                        {currentUser.email}
                      </p>
                      <p className="text-sm text-gray-600">
                        {currentUser.address}
                      </p>

                      {/* Action Buttons */}
                      <div className="space-y-2 mt-4">
                        {/* Update Profile Button */}
                        <button
                          onClick={() => navigate("/profile")}
                          className="w-full flex items-center justify-start bg-yellow-500 hover:bg-yellow-600 text-sm py-2 px-4 rounded-lg shadow-md"
                        >
                          <FaSyncAlt className="mr-2" /> Update Profile
                        </button>

                        {/* Task Button */}
                        <button
                          onClick={() => navigate("/AllTask")}
                          className="w-full flex items-center justify-start bg-blue-500 hover:bg-blue-950 text-sm py-2 px-4 rounded-lg shadow-md"
                        >
                          <FaTasks className="mr-2" /> Task
                        </button>

                        {/* Add Task Button */}
                        <button
                          onClick={() => navigate("/AddStaff")}
                          className="w-full flex items-center justify-start bg-blue-500 hover:bg-blue-950 text-sm py-2 px-4 rounded-lg shadow-md"
                        >
                          <FaPlusCircle className="mr-2" /> Add Shedule
                        </button>

                        {/* Sign Out Button */}
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center justify-start bg-green-500 hover:bg-green-700 text-sm py-2 px-4 rounded-lg shadow-md"
                        >
                          <FaSignOutAlt className="mr-2" /> Sign Out
                        </button>

                        {/* Close Account Button */}
                        <button
                          onClick={handledeleteAccount}
                          className="w-full flex items-center justify-start bg-red-500 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-lg shadow-md"
                        >
                          <FaUserTimes className="mr-2" /> Close Account
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate("/sign-in")}
                      className="w-full flex items-center justify-start bg-blue-500 hover:bg-blue-950 text-sm py-2 px-4 rounded-lg shadow-md"
                    >
                      <FaSignInAlt className="mr-2" /> Sign In
                    </button>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </ul>
      </div>
    </div>
  );
}
