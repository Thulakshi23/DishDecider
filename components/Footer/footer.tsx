import React from 'react';
import './footer.css'; // Import the CSS file
import Image from 'next/image';
import logo from '../../public/assets/Copy of food.png'; // Correct logo path
import facebookIcon from '../../public/assets/fb.jpg'; // Replace with your local Facebook icon path
import instagramIcon from '../../public/assets/insta.png'; // Replace with your local Instagram icon path

const Footer: React.FC = () => {
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
          <Image
            src={facebookIcon} // Use the imported local Facebook icon
            alt="Facebook"
            className="social-icon"
            width={24} // Specify the width
            height={24} // Specify the height
          />
        </a>
        <a
          href="https://www.instagram.com/yourprofile"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="social-link"
        >
          <Image
            src={instagramIcon} // Use the imported local Instagram icon
            alt="Instagram"
            className="social-icon"
            width={24} // Specify the width
            height={24} // Specify the height
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
