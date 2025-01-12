import React from 'react';
import './footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src="/assets/IMG-20250105-WA0089(1).jpg" alt="Dish Decider Logo" className="logo" />
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
            src="/assets/fb.jpg"
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
            src="/assets/insta.png"
            alt="Instagram"
            className="social-icon"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
