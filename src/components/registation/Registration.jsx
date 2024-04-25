import React, { useState } from 'react';
import { RegistrationDetails } from './regestationform.jsx';
import RegistrationFiles from './registaionfile.jsx';

const Registration = () => {
  const [step, setStep] = useState(1);
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

    // Combine details and files data and submit the registration
    const formData = new FormData();
    formData.append('fullName', details.fullName);
    formData.append('username', details.username);
    formData.append('email', details.email);
    formData.append('password', details.password);
    formData.append('avatar', files.avatar);
    formData.append('coverImage', files.coverImage);

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
    <div className="flex items-center justify-center ">
      <div className='bg-gray-500 h-[400px] w-[400px] rounded-xl flex items-center'>
        {step === 1 ? (
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
      </div>
    </div>
  );
};

export { Registration };
