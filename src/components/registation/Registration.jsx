import React, { useState } from 'react';
import { RegistrationDetails } from './regestationform.jsx';
import RegistrationFiles from './registaionfile.jsx';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/userApi'; // Import the centralized API function

const Registration = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false); // Add loading state
  const [errorMessage, setErrorMessage] = useState(''); // Add error message state
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    fullName: '',
    username: '',
    email: '',
    password: ''
  });
  const [files, setFiles] = useState({
    avatar: null,
    coverImage: null
  });

  const handleDetailsChange = (name) => (e) => {
    setDetails({ ...details, [name]: e.target.value });
  };

  const handleFilesChange = (name) => (e) => {
    setFiles({ ...files, [name]: e.target.files[0] });
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmitFiles = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setErrorMessage(''); // Reset error message

    // Combine details and files data and submit the registration
    const formData = new FormData();
    formData.append('fullName', details.fullName);
    formData.append('username', details.username);
    formData.append('email', details.email);
    formData.append('password', details.password);
    formData.append('avatar', files.avatar);
    formData.append('coverImage', files.coverImage);

    try {
      // Use the centralized API function to register the user
      const responseMessage = await registerUser(formData);
      console.log(responseMessage);
      navigate('/Login');
      console.log('User registered successfully:', responseMessage);
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessage(error.message || 'An error occurred during registration. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-gray-500 h-[400px] w-[400px] rounded-xl flex items-center justify-center">
        {loading ? (
          <div className="text-center">
            <div
              className="w-16 h-16 mx-auto border-4 border-yellow-500 border-dashed rounded-full animate-spin"
            ></div>
            <h2 className="mt-4 text-zinc-900 dark:text-white">Loading...</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Please wait, you are being registered.
            </p>
          </div>
        ) : step === 1 ? (
          <RegistrationDetails
            fullName={details.fullName}
            username={details.username}
            email={details.email}
            password={details.password}
            onChange={handleDetailsChange}
            onSubmit={handleSubmitDetails}
          />
        ) : (
          <RegistrationFiles
            avatar={files.avatar}
            coverImage={files.coverImage}
            onChange={handleFilesChange}
            onSubmit={handleSubmitFiles}
          />
        )}
        {errorMessage && <p className="mt-4 text-center text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export { Registration };
