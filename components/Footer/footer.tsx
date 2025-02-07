import React from 'react';
import './footer.css'; // Import the CSS file
import Image from 'next/image';
import logo from '../../public/assets/food.png'; // Correct logo path

const Footer = () => {
  return (
    <footer className="footer">
      <Image src={logo} alt="DishDecider Logo" className="footer-logo" width={100} height={50} />
      <p className="footer-paragraph">© 2025 dishdecider.com</p>
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
