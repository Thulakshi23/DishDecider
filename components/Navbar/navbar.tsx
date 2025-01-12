import Link from 'next/link';
import Image from 'next/image';
import './navbar.css'; // Import the CSS file
import logo from '../../public/assets/IMG-20250105-WA0089(1).jpg'; // Ensure the logo path is correct

const Navbar: React.FC = () => {
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
        <Link href="/login" className="login-link">Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
