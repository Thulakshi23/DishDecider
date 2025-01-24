import React from 'react';
import backgroundImage from '../../public/assets/Backround3.jpg'; // Adjust the path as necessary
import { motion } from 'framer-motion'; // Import Framer Motion components
import './contact.css';

const ContactUs: React.FC = () => {
  return (
    <div
      id="contact-us-page"
      className="contact-us-page"
      style={{ backgroundImage: `url(${backgroundImage.src})` }} // Use .src for Next.js image import
    >
      <div className="contact-box">
        <motion.h1
          className="heading"
          initial={{ opacity: 0, y: -50 }} // Initial state for animation
          animate={{ opacity: 1, y: 0 }} // Animate to this state
          transition={{ duration: 0.5 }} // Transition duration
        >
          Contact Us
        </motion.h1>
        <motion.form
          className="form"
          initial={{ opacity: 0, y: 50 }} // Initial state for animation
          animate={{ opacity: 1, y: 0 }} // Animate to this state
          transition={{ duration: 0.5 }} // Transition duration
        >
          <label htmlFor="contact-name" className="label">Name:</label>
          <input type="text" id="contact-name" name="contact-name" required className="input" />

          <label htmlFor="contact-email" className="label">Email:</label>
          <input type="email" id="contact-email" name="contact-email" required className="input" />

          <label htmlFor="contact-phone" className="label">Phone:</label>
          <input type="tel" id="contact-phone" name="contact-phone" required className="input" />
          
          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.05 }} // Scale effect on hover
            whileTap={{ scale: 0.95 }} // Scale effect on tap
          >
            Submit
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default ContactUs;
