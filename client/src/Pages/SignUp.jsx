import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import sign_up from "../Images/sign_up.png"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";



export default function SignUp() {
  const [formdata, setFormdata] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        return;
      }
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="container flex justify-between items-start mr-20 mb-5">
        {/* Image container */}
        <div className="w-[600px]">
          <img src={sign_up} alt="Sign In" className="w-full h-auto rounded-xl ml-12 mt-8" />
        </div>
        {/* Form container */}
        <div className="w-[500px] mt-16">
          <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-2">
              <label htmlFor="name" className="text-gray-700 font-bold">Full name</label>
              <input
                 type="text"
            placeholder="Username"
            id="username"


                onChange={handleChange}
                required
                className="p-2 block w-full rounded-xl bg-gray-100 text-black border-none placeholder-gray-400 placeholder-opacity-50 font-custom text-md"
              />
            </div>

            <div className="flex flex-col mt-2">
              <label htmlFor="name" className="text-gray-700 font-bold">Email</label>
              <input
                type="email"
            placeholder="Email"
            id="email"

                onChange={handleChange}
                required
                className="p-2 block w-full rounded-xl bg-gray-100 text-black border-none placeholder-gray-400 placeholder-opacity-50 font-custom text-md"
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="address" className="text-gray-700 font-bold">Address</label>
              <input
                type="address"
                placeholder="Address"
                id="address"
                onChange={handleChange}
                required
                className="p-2 block w-full rounded-xl bg-gray-100 text-black border-none placeholder-gray-400 placeholder-opacity-50 font-custom text-md"
              />
            </div>

            <div className="flex flex-col mt-2 relative">
            <label htmlFor="address" className="text-gray-700 font-bold">Paaword</label>
              <input
                type={showPassword ? 'text' : 'password'} // Toggles between text and password
              
            placeholder="Password"
            id="password"

                onChange={handleChange}
                required
                className="p-2 block w-full rounded-xl bg-gray-100 text-black border-none placeholder-gray-400 placeholder-opacity-50 font-custom text-md"
              />
              {/* Eye icon to toggle password visibility */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 cursor-pointer text-gray-600 mt-3"
              >
                {showPassword ? <FaEye className='mt-2' /> : <FaEyeSlash  />} {/* Use an emoji or replace with an icon */}
              </span>
            </div>

            <button
              disabled={loading}
              className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-70 mt-8"
            >
              {loading ? 'Loading...' : 'Sign Up'}
            </button>

            <OAuth />

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/sign-in" className="text-blue-600 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
