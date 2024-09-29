import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/User/userSlice';
import OAuth from '../components/OAuth';
import signIn from "../Images/sign_in.png"

export default function SignIn() {
  const [formdata, setFormdata] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/profile');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex   ">
      <div className="container flex justify-between items-start mr-20 mb-5">
        {/* Image container */}
        <div className="w-[600px]">
          <img src={signIn} alt="Machine" className="w-full h-auto rounded-xl mt-12 ml-12" />
        </div>
        {/* Form container */}
        <div className="w-[500px] mt-32">
  <form onSubmit={handleSubmit}>
    <div className="flex flex-col mt-6">
      <label htmlFor="email" className="text-gray-700 font-bold mb-2 left-0">Email</label>
      <input
        type="email"
        placeholder="Email"
        id="email"
        onChange={handleChange}
        required
        className="p-2 block w-full rounded-xl bg-gray-100 text-black border-none placeholder-gray-400 placeholder-opacity-50 font-custom text-md"
      />
    </div>

    <div className="flex flex-col mt-6">
      <label htmlFor="password" className="text-gray-700 font-bold mb-2">Password</label>
      <input
        type="password"
        placeholder="Password"
        id="password"
        onChange={handleChange}
        required
        className="p-2 block w-full rounded-xl bg-gray-100 text-black border-none placeholder-gray-400 placeholder-opacity-50 font-custom text-md"
      />
    </div>

    <button
      disabled={loading}
      className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-70 mt-8"
    >
      {loading ? 'Loading...' : 'Sign In'}
    </button>

    <OAuth />

    <div className="text-center mt-6">
      <p className="text-gray-600">
        Don't have an account?{' '}
        <Link to="/sign-up" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  </form>
</div>


      </div>
    </div>
  );
}
