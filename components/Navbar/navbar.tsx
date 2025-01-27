"use client"; // Ensure this component is a client component

import Link from 'next/link';
import Image from 'next/image';
import './navbar.css'; // Import the CSS file
import logo from '../../public/assets/IMG-20250105-WA0089(1).jpg'; // Correct logo path
import React, { useState, useEffect } from 'react'; // Import useState and useEffect for state management

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [username, setUsername] = useState(''); // State for storing the username
  const [firstLetter, setFirstLetter] = useState(''); // State for storing the first letter of the username

  useEffect(() => {
    // Check if user is logged in by fetching from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedFirstLetter = localStorage.getItem('firstLetter');

    if (storedUsername) {
      setUsername(storedUsername);
      setFirstLetter(storedFirstLetter || ''); // Ensure firstLetter is set to empty string if null
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false); // Reset login status
    setUsername(''); // Clear the username
    setFirstLetter(''); // Clear the first letter
    localStorage.removeItem('username'); // Remove username from localStorage
    localStorage.removeItem('firstLetter'); // Remove first letter from localStorage
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Image src={logo} alt="Dish Decider Logo" className="logo-image" width={50} height={50} />
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link href="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link href="/mealplanner" className="nav-link">Meal Planner</Link>
          </li>
          <li>
            <Link href="/contactUs" className="nav-link">Contact Us</Link>
          </li>
        </ul>
      </nav>
      <div className="search-login">
        <input type="text" className="search-bar" placeholder="🔍 Search..." />
        {isLoggedIn ? (
          <div className="profile-container" onClick={handleLogout}>
            <div className="profile-icon">{firstLetter}</div> {/* Display first letter of the username */}
          </div>
        ) : (
          <Link href="/login" className="login-link">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
