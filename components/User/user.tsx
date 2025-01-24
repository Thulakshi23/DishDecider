// "use client";

// import React, { useState } from "react";
// import styles from "./UserPage.module.css";

// const UserPage: React.FC = () => {
//   const [activeTab, setActiveTab] = useState("savedRecipes");

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "savedRecipes":
//         return <div>Saved Recipes Content</div>;
//       case "preferences":
//         return <div>Preferences Content</div>;
//       case "settings":
//         return <div>Settings Content</div>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className={styles["user-page"]}>
//       <div className={styles["user-info"]}>
//         <img
//           src="/default-profile.png"
//           alt="User"
//           style={{ width: "80px", height: "80px", borderRadius: "50%" }}
//         />
//         <div>
//           <h3>User Name</h3>
//           <button style={{ background: "#d9534f", color: "#fff", padding: "10px", borderRadius: "5px" }}>
//             Log Out
//           </button>
//         </div>
//       </div>

//       <div className={styles["tabs"]}>
//         <button
//           className={`${styles["tab-button"]} ${activeTab === "savedRecipes" ? styles["active"] : ""}`}
//           onClick={() => setActiveTab("savedRecipes")}
//         >
//           Saved Recipes
//         </button>
//         <button
//           className={`${styles["tab-button"]} ${activeTab === "preferences" ? styles["active"] : ""}`}
//           onClick={() => setActiveTab("preferences")}
//         >
//           Preferences
//         </button>
//         <button
//           className={`${styles["tab-button"]} ${activeTab === "settings" ? styles["active"] : ""}`}
//           onClick={() => setActiveTab("settings")}
//         >
//           Settings
//         </button>
//       </div>

//       <div className={styles["tab-content"]}>{renderTabContent()}</div>
//     </div>
//   );
// };

// export default UserPage;
// "use client";

// import React from "react";
// import { useRouter } from "next/router";

// const UserPage: React.FC = () => {
//   const router = useRouter();

//   const handleLogout = () => {
//     // Perform logout logic here
//     router.push("/login"); // Redirect back to the login page
//   };

//   return (
//     <div className="user-page">
//       <div className="user-container">
//         <h1 className="heading">Welcome to the User Page</h1>
//         <p className="info">
//           This is your user dashboard. You can manage your account, view your
//           profile, and explore more features!
//         </p>

//         <div className="actions">
//           <button className="button" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>

//       <style jsx>{`
//         .user-page {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           height: 100vh;
//           background-color: #f4f4f9;
//         }
//         .user-container {
//           text-align: center;
//           background: #ffffff;
//           padding: 40px;
//           border-radius: 10px;
//           box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//         }
//         .heading {
//           font-size: 24px;
//           margin-bottom: 20px;
//           color: #333333;
//         }
//         .info {
//           font-size: 16px;
//           color: #555555;
//           margin-bottom: 30px;
//         }
//         .actions {
//           display: flex;
//           justify-content: center;
//         }
//         .button {
//           background-color: #4caf50;
//           color: white;
//           border: none;
//           padding: 10px 20px;
//           border-radius: 5px;
//           cursor: pointer;
//           font-size: 16px;
//           transition: background-color 0.3s ease;
//         }
//         .button:hover {
//           background-color: #45a049;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default UserPage;

