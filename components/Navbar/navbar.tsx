"use client"; // Add this line at the top to mark the component as a client component

import Link from 'next/link';
import Image from 'next/image';
import './navbar.css'; // Import the CSS file
import logo from '../../public/assets/IMG-20250105-WA0089(1).jpg'; // Ensure the logo path is correct
import React, { useState } from 'react'; // Import useState for state management

const Navbar: React.FC = () => {
  // State to manage login status and username
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [username, setUsername] = useState(''); // State for storing the username

  // Function to simulate login (replace this with your actual login logic)
  const handleLogin = () => {
    const fakeUserName = 'John Doe'; // This would come from your actual login response
    setUsername(fakeUserName);
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
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
            <div className="profile-icon">{username.charAt(0).toUpperCase()}</div> {/* Display first letter of the username */}
          </div>
        ) : (
          <Link href="/login" className="login-link" onClick={handleLogin}>Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
