// import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './Form.css'
import { newAccessCode, validateAccessCode } from '../../api/user';

const Form = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await newAccessCode(phoneNumber);
        setMessage(response.message || response.error);
        console.log(`Phone number: ${phoneNumber} Access code: ${response}`);
    };

    // const navigate = useNavigate();
    const handleValidate = async(e) => {
      e.preventDefault();
      const response = await validateAccessCode(phoneNumber, accessCode);
      setMessage(response.message || response.error);
      if (response.success) {
        localStorage.setItem('phoneNumber', phoneNumber);
        // navigate('/user');
      }
    };

    return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button type="submit">Get Access Code</button>
      </form>
      <form onSubmit={handleValidate}>
        <input
          type="text"
          placeholder="Access Code"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
        />
        <button type="submit">Validate Access Code</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default Form;