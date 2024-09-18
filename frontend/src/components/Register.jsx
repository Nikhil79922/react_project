/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('User'); // New state for role
  const [error, setError] = useState('');
  const navigate = useNavigate();

  //Redux
  const globalLink=useSelector((state)=>state.link);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(globalLink+'/signUp', { 
        name, 
        email, 
        mobile: phone,  
        role, 
        password 
      });
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">Register</h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-300">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-gray-300">Phone No.</label>
            <input
              type="text"
              id="mobile"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-300">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
            >
              <option value="ROLE_USER">User</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl focus:outline-none"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-400 hover:underline">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;

