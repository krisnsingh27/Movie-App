import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../features/themeSlice'
import './Navbar.css';

function Navbar() {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.theme);


  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">My Movie App</Link>
        </div>

        


        <div className="navbar-links">
          <Link to="/movie">MovieSearch</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
          <Link to="/profile">Profile</Link>
        </div>
        <div className='nav-right'>
          <button onClick={() => dispatch(toggleTheme())}>
            {theme==='dark'?'light':"dark"}
          </button>

        </div>
      </nav>
    </div>
  )
}

export default Navbar;
