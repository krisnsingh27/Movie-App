


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState(''); 
  const [showMessage, setShowMessage] = useState(false); 
  const navigate=useNavigate()
 

  const handlelogin = () => {
    const storeduser = JSON.parse(localStorage.getItem("user"));
    if (!storeduser) {
      setMessage("No user found. Please signup first.");
      setShowMessage(true);

      return;
    }
    if (email === storeduser.email && password === storeduser.password) {
      setMessage("Login successful");
      setShowMessage(true);
      localStorage.setItem("isLoggedIn", true);
      setIsLoggedIn(true);
      if(setShowMessage){navigate('/movie') }
      
      
    } else {
      setMessage("Wrong email or password");
      setShowMessage(true);
    }
  };

 
  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
        setMessage(''); 
      }, 4000);
      return () => clearTimeout(timer); 
    }
  }, [showMessage]);

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button onClick={handlelogin}>Login</button>

     
        {showMessage && (
          <div style={{
            border: '1px solid black',
            padding: '10px',
            marginTop: '10px',
            textAlign: 'center',
            backgroundColor: '#f8d7da', 
            color: '#721c24' 
          }}>
            {message}
          </div>
        )}

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;