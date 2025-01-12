import React from 'react';
import { useRouter } from 'next/router';
import backgroundImage from '../../public/assets/pexels-alesiakozik-6544243.jpg'; // Import the background image
import './register.css'; // Import the CSS file for styles
const Register: React.FC = () => {
  const router = useRouter(); // Use Next.js useRouter for navigation

  const handleBackToLogin = () => {
    router.push('/login'); // Navigate to the login page
  };

  return (
    <div className="register-page" style={{ backgroundImage: `url(${backgroundImage.src})` }}>
      <div className="register-container">
        <h2 className="heading">Register</h2>
        <form className="form">
          <label htmlFor="first-name" className="label">First Name</label>
          <input type="text" id="first-name" className="input" required />
          <label htmlFor="last-name" className="label">Last Name</label>
          <input type="text" id="last-name" className="input" required />
          <label htmlFor="email" className="label">Email</label>
          <input type="email" id="email" className="input" required />
          <label htmlFor="password" className="label">Password</label>
          <input type="password" id="password" className="input" required />
          <label htmlFor="confirm-password" className="label">Confirm Password</label>
          <input type="password" id="confirm-password" className="input" required />
          <div className="button-container">
            <button type="submit" className="button submit-btn">
              Submit
            </button>
            <button
              type="button"
              className="button back-btn"
              onClick={handleBackToLogin}
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
