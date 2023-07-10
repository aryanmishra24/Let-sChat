import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const authObject = {
      'Project-ID': '48efb162-c380-40b2-bff4-322a62bb6163',
      'User-Name': username,
      'User-Secret': password,
    };
  
    try {
      // Authenticate the user
      await axios.get('https://api.chatengine.io/chats', {
        headers: authObject,
      });
  
      // Store the user credentials in localStorage
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
  
      // Redirect to the chat page or perform any desired actions
      // For example, you can navigate to another route using React Router
      // history.push('/chat');
      window.location.reload();
      console.log('Authentication successful!');
    } catch (error) {
      console.log('Authentication error:', error);
      setError('Oops, incorrct credentials')
    }
  };
  

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
            required
          />
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>
          <h2 className = "error">{error}</h2>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
