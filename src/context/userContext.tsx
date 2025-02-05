


// // context/UserContext.tsx

// import React, { createContext, useContext, useState } from "react";

// interface UserContextProps {
//   userName: string;
//   setUserName: (name: string) => void;
//   email: string;
//   setEmail: (email: string) => void;
//   profilePic: string | null;
//   setProfilePic: (pic: string | null) => void;
//   logout: () => void; // Method to handle logout
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [userName, setUserName] = useState<string>("User Name");
//   const [email, setEmail] = useState<string>("");
//   const [profilePic, setProfilePic] = useState<string | null>(null);

//   const logout = () => {
//     setUserName("User Name");
//     setEmail("");
//     setProfilePic(null);
//     // You can also redirect to the home page after logout
//     window.location.href = "/"; // Redirect to home page
//   };

//   return (
//     <UserContext.Provider value={{ userName, setUserName, email, setEmail, profilePic, setProfilePic, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUserContext must be used within a UserProvider");
//   }
//   return context;
// };
