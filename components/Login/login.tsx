"use client"; // Add this line at the top to mark it as a client component

import React from 'react';
import Link from 'next/link';
import './login.css'; // Import the CSS file

const Login: React.FC = () => {
  return (
    <div id="login-page" className="login-page">
      <div className="login-container">
        <h2 className="heading">Login</h2>
        <form id="login-form" className="form">
          <label htmlFor="email" className="label">Email</label>
          <input
            type="email"
            id="email"
            required
            className="input"
          />
          <label htmlFor="password" className="label">Password</label>
          <input
            type="password"
            id="password"
            required
            className="input"
          />
          <button type="submit" className="button">Login</button>
        </form>
        <Link href="/forgot-password">
          <span className="forgot-password">Forgot password?</span>
        </Link>
        <p className="register-prompt">
          Don't have an account yet?{' '}
          <Link href="/register">
            <span className="register-button">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
