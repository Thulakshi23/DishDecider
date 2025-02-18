"use client"; // Ensure this component is a client component

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Import usePathname to detect the current path
import "./navbar.css"; // Import the CSS file
import logo from "../../public/assets/Copy of food.png"; // Correct logo path
import React, { useState, useEffect } from "react"; // Import useState and useEffect for state management

const Navbar: React.FC = () => {
  const pathname = usePathname(); // Get current path
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State for login status
  const [firstLetter, setFirstLetter] = useState<string>(""); // State for storing the first letter of the email
  const [isNightMode, setIsNightMode] = useState<boolean>(false); // State for toggling light/dark mode
  const [userRole, setUserRole] = useState<string>(""); // State for storing the user role

  useEffect(() => {
    // Check if user is logged in by fetching from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email"); // Fetch email from localStorage
    const storedRole = localStorage.getItem("role"); // Fetch role from localStorage

    if (storedUsername && storedEmail) {
      setFirstLetter(storedEmail.charAt(0).toUpperCase()); // Set firstLetter to the first character of the email
      setIsLoggedIn(true);
      setUserRole(storedRole || ""); // Set the role if it exists
    } else {
      setIsLoggedIn(false); // Ensure logged in status is false if not found
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false); // Reset login status
    localStorage.removeItem("username"); // Remove username from localStorage
    localStorage.removeItem("email"); // Remove email from localStorage
    localStorage.removeItem("role"); // Remove role from localStorage
    // Redirect to the home page or login page
    window.location.href = "/"; // Change this to "/login" if you want to go to the login page
  };

  // Function to toggle night mode
  const toggleNightMode = () => {
    setIsNightMode((prevMode) => {
      const newMode = !prevMode;
      document.body.classList.toggle("night-mode", newMode); // Toggle the night mode class on the body element
      return newMode;
    });
  };

  // Function to navigate to user or admin page
  const navigateToProfile = () => {
    if (userRole === "admin") {
      // Redirect to admin page
      window.location.href = "/admin"; // Replace with the actual admin page route
    } else {
      // Redirect to user page
      window.location.href = "/user"; // Replace with the actual user page route
    }
  };

  return (
    <div className="navbar">
      {/* Logo Section */}
      <div className="logo">
        <Image src={logo} alt="Dish Decider Logo" className="logo-image" width={100} height={100} />
      </div>

      {/* Navigation Links */}
      <nav>
        <ul className="nav-links">
          <li>
            <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/mealplanner" className={`nav-link ${pathname === "/mealplanner" ? "active" : ""}`}>
              Meal Planner
            </Link>
          </li>
          <li>
            <Link href="/upgrade" className={`nav-link ${pathname === "/upgrade" ? "active" : ""}`}>
              Upgrades
            </Link>
          </li>
          <li>
            <Link href="/contactUs" className={`nav-link ${pathname === "/contactUs" ? "active" : ""}`}>
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>

      {/* Login/Profile Section */}
      <div className="login-profile-container">
        {isLoggedIn ? (
          <div className="profile-container">
            <div className="profile-icon" onClick={navigateToProfile}>
              {firstLetter}
            </div>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="login-link">
            Login
          </Link>
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