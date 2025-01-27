"use client"; // Add this line at the top to mark it as a client component

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  name: string; // User's name
  email: string;
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for user data in localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set the user if exists
    }
  }, []);

  const login = (user: User) => {
    setUser(user); // Set user state
    localStorage.setItem('user', JSON.stringify(user)); // Store user in localStorage
    localStorage.setItem('firstLetter', user.name.charAt(0).toUpperCase()); // Store first letter of the username
  };

  const logout = () => {
    setUser(null); // Reset user state
    localStorage.removeItem('user'); // Remove user from localStorage
    localStorage.removeItem('firstLetter'); // Remove first letter from localStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
