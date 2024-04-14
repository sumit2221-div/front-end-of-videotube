import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Registration = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [coverImage, setcoverImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create formData object to send file data
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);
    formData.append('coverImage', coverImage);

    try {
      const response = await fetch('https://backend-of-videotube.onrender.com/api/v1/users/register', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data); // Handle response from backend
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <form  className="h-[500px] w-[500px] bg-slate-800 rounded-lg  absolute top-[20%] left-[30%] flex flex-col items-center gap-5" onSubmit={handleSubmit}>
        <h1 className='text-2xl text-center text-teal-50'>REGISTATION FORM</h1>
      <input className='h-[50px] w-[300px] rounded-lg items-center '
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
      className='h-[50px] w-[300px] rounded-lg items-center '
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
      className='h-[50px] w-[300px] rounded-lg items-center '
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
      className='h-[50px] w-[300px] rounded-lg items-center '
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
      className='h-[50px] w-[300px] rounded-lg items-center '
        type="file"
        accept="image/*"
        onChange={(e) => setAvatar(e.target.files[0])}
      />
      <input
      className='h-[50px] w-[300px] rounded-lg items-center '
        type="file"
        accept="image/*"
        onChange={(e) => setcoverImage(e.target.files[0])}
      />

<p className="mt-2 text-base text-center text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/Login"
                    className="font-medium transition-all duration-200 text-primary hover:underline"
                >
                    Login 
                </Link>
            </p>
      <button className='h-[50px] w-[100px] rounded-xl bg-slate-500 text-white' type="submit">Register</button>
    </form>
  );
};

export default Registration;
