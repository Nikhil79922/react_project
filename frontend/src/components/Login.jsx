/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  //use context
  const globalLink=useSelector((state)=>state.link);

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const ROLE = localStorage.getItem('ROLE');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting
    setError(''); // Reset any previous error messages

    try {
      const response = await axios.post(globalLink+"/login", { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('ROLE', response.data.user.role);
      const dt = await response.data;
      console.log(dt)

      setIsLoggedIn(true); // Set login state to true
      navigate('/'); // Redirect on successful login
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setIsLoggedIn(false); // Set login state to false
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="relative bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700 overflow-hidden">
        {/* Dark overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-40"></div>

        {/* Main content */}
        <div className="relative z-10">
          {/* Conditionally render login or logout */}
          {!isLoggedIn ? (
            <>
              <h2 className="text-3xl font-bold mb-6 text-center text-white">Login</h2>
              {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-gray-300">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-gray-300">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full px-4 py-2 rounded-lg text-white ${loading ? 'bg-gray-600' : 'bg-gradient-to-r from-blue-600 to-teal-500'} transition-all duration-300 hover:opacity-90`}
                  disabled={loading} // Disable button when loading
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              <div className="mt-4 text-center">
                <a href="/forgot-password" className="text-blue-400 underline">Forgot Password?</a>
                <br />
                <span className='text-white'>Don't have an account? </span><a href="/register" className="text-blue-400 underline">Register</a>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-6 text-center text-white">You are logged in!</h2>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;


