
import React from 'react';
import './Footer.css'; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} Your Company Name. All Rights Reserved.</p>
        
      </div>
    </footer>
  );
};

export default Footer;