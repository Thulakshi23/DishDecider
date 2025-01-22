"use client"; // Mark as a client component

import React, { useState } from "react";
import Link from "next/link";
import apiClient from "@/utils/apiClient"; // Import the API client
import "./login.css"; // Import the CSS file

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await apiClient.post("/login", { email, password });
      setMessage("Login successful!");
      console.log("Token:", response.data.token); // Handle token (e.g., store it in localStorage or cookies)
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="login-page" className="login-page">
      <div className="login-container">
        <h2 className="heading">Login</h2>
        <form id="login-form" className="form" onSubmit={handleLogin}>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <Link href="/forgot-password">
          <span className="forgot-password">Forgot password?</span>
        </Link>
        <p className="register-prompt">
          Don't have an account yet?{" "}
          <Link href="/register">
            <span className="register-button">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
