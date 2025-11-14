import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './SignupPage.css'; 


function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()

  const handlesignin = () => {
    if (!name || !email || !password) {
      alert("Please fill all details");
      return;
    }
    const user = { name, email, password  };
    localStorage.setItem("user", JSON.stringify(user));
    setName("");
    setEmail("");
    setPassword("");
    alert("Signup successful!");
    navigate("/login")
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Signup</h1>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter name"
        />
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
        <button onClick={handlesignin}>Sign Up</button>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
