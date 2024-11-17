import React, { useState } from 'react';
import './Home.css';
import axios from 'axios';

const Home = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alterBtn, setAlterBtn] = useState(true); 
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/addUserDetails', {
        name, email, password
      });

      if (response.data.success) {
        console.log(response.data.message);
        setErrorMessage("Account created successfully!");
        setName('');
        setEmail('');
        setPassword('');
        setAlterBtn(false); // Switch to sign-in mode after signup
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : "Server error");
    }
  };

  return (
    <div className='register-container'>
      <form className='container' onSubmit={handleSubmit}>
        <h2>{alterBtn ? 'Sign Up' : 'Sign In'}</h2>
        
        <div className='userInput'>
          {alterBtn && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter Name'
              required
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email'
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
            required
          />
        </div>

        <div className='btn'>
          <button type='submit'>
            {alterBtn ? 'Sign Up' : 'Sign In'}
          </button>
        </div>

        <p onClick={() => setAlterBtn(!alterBtn)} style={{ cursor: 'pointer', color: 'blue' }}>
          {alterBtn ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </p>
      </form>
      {errorMessage && <p style={{ color: 'red', textDecoration: 'none' }}>{errorMessage}</p>}
    </div>
  );
};

export default Home;
