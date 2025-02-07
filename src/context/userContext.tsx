// context/userContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the properties for the User Context
interface UserContextProps {
  userName: string;
  setUserName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  profilePic: string | null;
  setProfilePic: (pic: string | null) => void;
  logout: () => void; // Method to handle logout
}

// Create the User Context with an initial value of undefined
const UserContext = createContext<UserContextProps | undefined>(undefined);

// UserProvider component to provide user state to its children
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState<string>("User Name");
  const [email, setEmail] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string | null>(null);

  // Function to handle user logout
  const logout = () => {
    setUserName("User Name");
    setEmail("");
    setProfilePic(null);
    // Redirect to home page after logout
    window.location.href = "/"; 
  };

  return (
    <UserContext.Provider value={{ userName, setUserName, email, setEmail, profilePic, setProfilePic, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the User Context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
export const useUser = () => {

  // Your implementation of useUser hook

  return {

    isLoggedIn: false,

    userEmail: "",

    logout: () => {}

  };

};
export default UserContext;
