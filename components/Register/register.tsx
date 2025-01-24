"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion"; // Import motion

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(""); // State for password strength
  const router = useRouter();

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    // Check password strength
    if (value.length < 6) {
      setPasswordStrength("Weak");
    } else if (value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/)) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Medium");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      toast.success(data.message);
      // Redirect to the home page after successful registration
      setTimeout(() => {
        router.push("/"); // Redirect to the home page
      }, 2000); // Optional: delay before redirecting
    } else {
      toast.error(data.message);
    }
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <motion.div
      className="register-page"
      initial={{ opacity: 0, y: -50 }} // Initial state
      animate={{ opacity: 1, y: 0 }} // Animation to apply
      exit={{ opacity: 0, y: 50 }} // Exit animation
      transition={{ duration: 0.5 }} // Transition duration
    >
      <ToastContainer />
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
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="input"
              required
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            <FontAwesomeIcon
              icon={passwordVisible ? faEye : faEyeSlash}
              className="toggle-visibility"
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          </div>
          <span
            className={`password-strength ${
              passwordStrength === "Strong"
                ? "strong"
                : passwordStrength === "Medium"
                ? "medium"
                : "weak"
            }`}
          >
            {passwordStrength && `Password Strength: ${passwordStrength}`}
          </span>
          <label htmlFor="confirm-password" className="label">Confirm Password</label>
          <div className="password-container">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirm-password"
              className="input"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={confirmPasswordVisible ? faEye : faEyeSlash}
              className="toggle-visibility"
              onClick={() =>
                setConfirmPasswordVisible(!confirmPasswordVisible)
              }
            />
          </div>
          <div className="button-container">
            <button type="submit" className="button submit-btn">Submit</button>
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
    </motion.div>
  );
};

export default Register;
