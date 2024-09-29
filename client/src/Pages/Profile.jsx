/* eslint-disable no-undef */
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
} from "../redux/User/userSlice";
import "./css/profile.css";

import updataprofile from "../Images/profileuptade.png";

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [orders, setOrders] = useState([]);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/auth/Staff/${currentUser._id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  return (
    <div className="flex justify-between mt-12">
      <div className="w-1/2 pr-4">
        <div className="user-profile ml-16 bg-gray-200 p-8 rounded-lg shadow-md">
          <h1 className="user-profile-name text-4xl font-bold mb-4">
            Update Your Profile
          </h1>
          <form onSubmit={handleSubmit} className="user-profile-form ml-32">
            <div className="mb-2">
              <label
                htmlFor="profilePicture"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Update Profile Picture
              </label>
              <input
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <img
                src={formData.profilePicture || currentUser.profilePicture}
                alt="profile"
                className="profile-image h-32 w-32 rounded-full object-cover cursor-pointer mb-4 border-2 border-gray-300"
                onClick={() => fileRef.current.click()}
              />
              <p className="user-profile-image-status text-sm text-gray-500 mb-2">
                {imageError ? (
                  <span className="text-red-500">
                    Error uploading image (file size must be less than 2 MB)
                  </span>
                ) : imagePercent > 0 && imagePercent < 100 ? (
                  <span>{`Uploading: ${imagePercent}%`}</span>
                ) : imagePercent === 100 ? (
                  <span className="text-green-500">
                    Image uploaded successfully
                  </span>
                ) : (
                  ""
                )}
              </p>
            </div>

            <div className="mb-2">
              <label
                htmlFor="email"
                className="block mr-32 text-sm font-semibold  text-gray-900 mb-2"
              >
                Update Your Username :-
              </label>
              <input
                defaultValue={currentUser.username}
                type="text"
                id="username"
                placeholder="Username"
                className="user-profile-username border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="email"
                className="block mr-36 text-sm font-semibold  text-gray-900 mb-2"
              >
                Update Your Email :-
              </label>
              <input
                defaultValue={currentUser.email}
                type="email"
                id="email"
                placeholder="Email"
                className="user-profile-email border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="email"
                className="block mr-32 text-sm font-semibold  text-gray-900 mb-2"
              >
                Update Your Address :-
              </label>
              <input
                defaultValue={currentUser.address}
                type="text"
                id="address"
                placeholder="Address"
                className="user-profile-address border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>

            <button className="user-profile-update-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
              {loading ? "Loading..." : "Update"}
            </button>
          </form>

          <p className="user-profile-errors text-red-500">
            {error && "Something went wrong"}
          </p>
          <p className="user-profile-update-success text-green-500">
            {updateSuccess && "User updated successfully"}
          </p>
        </div>
      </div>

      <div className="w-1/2 pl-4">
        <img
          src={updataprofile}
          alt="Machine"
          className="w-full h-auto rounded-xl"
        />
      </div>
    </div>
  );
}
