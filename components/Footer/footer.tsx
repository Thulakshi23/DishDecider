import React from 'react';
import './footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img
          src="https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622733/IMG-20250105-WA0089_1_g60v3l.jpg" // Replace with your Cloudinary logo URL
          alt="Dish Decider Logo"
          className="logo"
        />
      </div>
      <p className="footer-paragraph">© 2024 DishDecider.com</p>
      <div className="social-links">
        <a
          href="https://www.facebook.com/yourpage"
          target="_blank"
          aria-label="Facebook"
          rel="noreferrer"
          className="social-link"
        >
          <img
            src="https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622733/fb_fwfnd8.jpg" // Replace with your Cloudinary Facebook icon URL
            alt="Facebook"
            className="social-icon"
          />
        </a>
        <a
          href="https://www.instagram.com/yourprofile"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="social-link"
        >
          <img
            src="https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622733/insta_ey66qt.png" // Replace with your Cloudinary Instagram icon URL
            alt="Instagram"
            className="social-icon"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
