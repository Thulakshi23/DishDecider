"use client";

import React, { useState } from "react";
import styles from "./UserPage.module.css";

const UserPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("savedRecipes");

  const renderTabContent = () => {
    switch (activeTab) {
      case "savedRecipes":
        return <div>Saved Recipes Content</div>;
      case "preferences":
        return <div>Preferences Content</div>;
      case "settings":
        return <div>Settings Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className={styles["user-page"]}>
      <div className={styles["user-info"]}>
        <img
          src="/default-profile.png"
          alt="User"
          style={{ width: "80px", height: "80px", borderRadius: "50%" }}
        />
        <div>
          <h3>User Name</h3>
          <button style={{ background: "#d9534f", color: "#fff", padding: "10px", borderRadius: "5px" }}>
            Log Out
          </button>
        </div>
      </div>

      <div className={styles["tabs"]}>
        <button
          className={`${styles["tab-button"]} ${activeTab === "savedRecipes" ? styles["active"] : ""}`}
          onClick={() => setActiveTab("savedRecipes")}
        >
          Saved Recipes
        </button>
        <button
          className={`${styles["tab-button"]} ${activeTab === "preferences" ? styles["active"] : ""}`}
          onClick={() => setActiveTab("preferences")}
        >
          Preferences
        </button>
        <button
          className={`${styles["tab-button"]} ${activeTab === "settings" ? styles["active"] : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </div>

      <div className={styles["tab-content"]}>{renderTabContent()}</div>
    </div>
  );
};

export default UserPage;
