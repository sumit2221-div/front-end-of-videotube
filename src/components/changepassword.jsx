import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../api/userApi'; // Import the centralized API function

function Changepassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'oldPassword') {
      setOldPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message state

    try {
      // Use the centralized API function to change the password
      const responseMessage = await changePassword({ oldPassword, newPassword });
      setMessage(responseMessage); // Set success message
      navigate('/login'); // Redirect to login page after successful password change
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage(error.message || 'An error occurred, please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="w-1/3 px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">Change Password</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="oldPassword">
            Old Password
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="oldPassword"
            type="password"
            placeholder="Old Password"
            name="oldPassword"
            value={oldPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="newPassword">
            New Password
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="newPassword"
            type="password"
            placeholder="New Password"
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Change Password
          </button>
        </div>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
}

export default Changepassword;
