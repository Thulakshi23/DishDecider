import React from 'react';
import backgroundImage from '../../public/assets/Backround3.jpg'; // Adjust the path as necessary
import './contact.css';

const ContactUs: React.FC = () => {
  return (
    <div
      id="contact-us-page"
      className="contact-us-page"
      style={{ backgroundImage: `url(${backgroundImage.src})` }} // Use .src for Next.js image import
    >
      <div className="contact-box">
        <h1 className="heading">Contact Us</h1>
        <form className="form">
          <label htmlFor="contact-name" className="label">Name:</label>
          <input type="text" id="contact-name" name="contact-name" required className="input" />

          <label htmlFor="contact-email" className="label">Email:</label>
          <input type="email" id="contact-email" name="contact-email" required className="input" />

          <label htmlFor="contact-phone" className="label">Phone:</label>
          <input type="tel" id="contact-phone" name="contact-phone" required className="input" />
          
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
