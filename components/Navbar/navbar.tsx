"use client"; // Ensure this component is a client component

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Import usePathname to detect the current path
import "./navbar.css"; // Import the CSS file
import logo from "../../public/assets/Teller Besteck Grillen Einladung.png"; // Correct logo path
import React, { useState, useEffect } from "react"; // Import useState and useEffect for state management

const Navbar: React.FC = () => {
  const pathname = usePathname(); // Get current path
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [username, setUsername] = useState(""); // State for storing the username
  const [firstLetter, setFirstLetter] = useState(""); // State for storing the first letter of the email
  const [isNightMode, setIsNightMode] = useState(false); // State for toggling light/dark mode

  useEffect(() => {
    // Check if user is logged in by fetching from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email"); // Fetch email from localStorage

    if (storedUsername && storedEmail) {
      setUsername(storedUsername);
      setFirstLetter(storedEmail.charAt(0).toUpperCase()); // Set firstLetter to the first character of the email
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false); // Reset login status
    setUsername(""); // Clear the username
    setFirstLetter(""); // Clear the first letter
    localStorage.removeItem("username"); // Remove username from localStorage
    localStorage.removeItem("email"); // Remove email from localStorage
  };

  // Function to toggle night mode
  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
    document.body.classList.toggle("night-mode", !isNightMode); // Toggle the night mode class on the body element
  };

  return (
    <div className="navbar">
      {/* Logo Section */}
      <div className="logo">
        <Image src={logo} alt="Dish Decider Logo" className="logo-image" width={100} height={100} /> {/* Increased logo size */}
      </div>

      {/* Navigation Links */}
      <nav>
        <ul className="nav-links">
          <li>
            <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>Home</Link>
          </li>
          <li>
            <Link href="/mealplanner" className={`nav-link ${pathname === "/mealplanner" ? "active" : ""}`}>Meal Planner</Link>
          </li>
          <li>
            <Link href="/upgrade" className={`nav-link ${pathname === "/upgrade" ? "active" : ""}`}>Upgrades</Link> {/* Added Upgrades Link */}
          </li>
          <li>
            <Link href="/contactUs" className={`nav-link ${pathname === "/contactUs" ? "active" : ""}`}>Contact Us</Link>
          </li>
        </ul>
      </nav>

      {/* Login/Profile Section */}
      <div className="login-profile-container">
        {isLoggedIn ? (
          <div className="profile-container" onClick={handleLogout}>
            <div className="profile-icon">{firstLetter}</div> {/* Display first letter of email */}
          </div>
        ) : (
          <Link href="/login" className="login-link">Login</Link>
        )}
        
        {/* Night Mode Toggle */}
        <div className="night-mode-toggle" onClick={toggleNightMode}>
          <span className={isNightMode ? "sun-icon" : "moon-icon"}></span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;