"use client"; // Mark as a client component

import React, { useState } from "react";
import { useRouter } from "next/router";
import apiClient from "@/utils/apiClient"; // Import the API client
import "./register.css"; // Import the CSS file for styles

const Register: React.FC = () => {
  const router = useRouter(); // Use Next.js useRouter for navigation
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      await apiClient.post("/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      setMessage("Registration successful!");
      setTimeout(() => router.push("/login"), 1500); // Redirect to login after 1.5s
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push("/login"); // Navigate to the login page
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="heading">Register</h2>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="firstName" className="label">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="input"
            required
            value={formData.firstName}
            onChange={handleChange}
          />
          <label htmlFor="lastName" className="label">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="input"
            required
            value={formData.lastName}
            onChange={handleChange}
          />
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="input"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="input"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor="confirmPassword" className="label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="input"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <div className="button-container">
            <button type="submit" className="button submit-btn" disabled={isLoading}>
              {isLoading ? "Registering..." : "Submit"}
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
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
