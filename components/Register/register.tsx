import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import './register.css'; // Import the CSS file for styles

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Show success toast notification
      toast.success(data.message);
      // Redirect to the login page after a delay
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      // Show error toast notification
      toast.error(data.message);
    }
  };

  const handleBackToLogin = () => {
    router.push('/login'); // Redirect to the login page
  };

  return (
    <div className="register-page">
      <ToastContainer /> {/* Add ToastContainer to render the toasts */}
      <div className="register-container">
        <h2 className="heading">Register</h2>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="first-name" className="label">First Name</label>
          <input 
            type="text" 
            id="first-name" 
            className="input" 
            required 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} 
          />
          <label htmlFor="last-name" className="label">Last Name</label>
          <input 
            type="text" 
            id="last-name" 
            className="input" 
            required 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} 
          />
          <label htmlFor="email" className="label">Email</label>
          <input 
            type="email" 
            id="email" 
            className="input" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <label htmlFor="password" className="label">Password</label>
          <input 
            type="password" 
            id="password" 
            className="input" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <label htmlFor="confirm-password" className="label">Confirm Password</label>
          <input 
            type="password" 
            id="confirm-password" 
            className="input" 
            required 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
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
