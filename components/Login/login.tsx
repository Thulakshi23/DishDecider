"use client"; // Add this line at the top to mark it as a client component

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter for redirection
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import './login.css'; // Import the CSS file

// Import Framer Motion
import { motion } from 'framer-motion';

// Import Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const router = useRouter(); // Initialize router for redirection

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Make a request to your API for login
    const response = await fetch('/api/login', { // Replace with your actual login API route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Send email and password
    });

    console.log('Response:', response); // Log response for debugging

    if (response.ok) {
      const data = await response.json(); // Parse the response to get user info
      const firstName = data.user.firstName; // Get firstName from response
      const firstLetter = firstName.charAt(0).toUpperCase(); // Get first letter of username

      // Store user info in localStorage for persistent login
      localStorage.setItem('username', firstName);
      localStorage.setItem('email', email); // Store the full email
      localStorage.setItem('firstLetter', firstLetter);
      localStorage.setItem('role', data.user.role); // Store user role
      localStorage.setItem('token', data.token); // Store JWT token for later use

      toast.success('Login successful!'); // Display success toast

      // Redirect based on user role
      const redirectUrl = data.redirectUrl; // Use redirect URL from response
      
      // Delay redirect to allow toast to display
      setTimeout(() => {
        router.push(redirectUrl); // Redirect to the determined page
      }, 2000); // Adjust the time (2000 ms = 2 seconds)
    } else {
      const error = await response.json(); // Parse error response
      console.log('Error:', error); // Log error for debugging
      toast.error(error.message || 'Login failed. Please check your credentials.'); // Display error toast
    }
  };

  return (
    <motion.div
      id="login-page"
      className="login-page"
      initial={{ opacity: 0, y: -50 }} // Initial state
      animate={{ opacity: 1, y: 0 }} // Animation to apply
      exit={{ opacity: 0, y: 50 }} // Exit animation
      transition={{ duration: 0.5 }} // Transition duration
    >
      <ToastContainer position="top-right" /> {/* Ensure this is included */}
      <div className="login-container">
        <h2 className="heading">Login</h2>
        <form id="login-form" className="form" onSubmit={handleLogin}> {/* Add onSubmit handler */}
          <label htmlFor="email" className="label">Email</label>
          <input
            type="email"
            id="email"
            required
            className="input"
            value={email} // Bind email state
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
          <label htmlFor="password" className="label">Password</label>
          <div className="password-container">
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              required
              className="input"
              value={password} // Bind password state
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
            <FontAwesomeIcon
              icon={passwordVisible ? faEye : faEyeSlash}
              className="toggle-visibility"
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          </div>
          <button type="submit" className="button">Login</button>
        </form>
    
        <p className="register-prompt">
          Don&apos;t have an account yet?{' '}
          <Link href="/register">
            <span className="register-button">Register</span>
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
