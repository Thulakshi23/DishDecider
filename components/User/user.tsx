"use client";

import React, { useState, useEffect } from "react";
import styles from "./UserPage.module.css";

const UserPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("savedRecipes");
  const [userName, setUserName] = useState("User Name");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [newUserName, setNewUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedProfilePic = localStorage.getItem("profilePic");

    if (storedUserName) setUserName(storedUserName);
    if (storedProfilePic) setProfilePic(storedProfilePic);
  }, []);

  const handleSaveChanges = () => {
    if (newUserName.trim() !== "") {
      setUserName(newUserName);
      localStorage.setItem("userName", newUserName);
      alert("Profile updated successfully!");
    } else {
      alert("Please enter a valid name.");
    }
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
    localStorage.removeItem("userName");
    localStorage.removeItem("profilePic");
    setUserName("User Name");
    setProfilePic(null);
  };

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setProfilePic(imageUrl);
        localStorage.setItem("profilePic", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setProfilePic(null);
    localStorage.removeItem("profilePic");
    setIsDeleting(false); // Close the delete popup
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "savedRecipes":
        return (
          <div className={styles["grid-container"]}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className={styles["grid-item"]}>
                Recipe {item}
              </div>
            ))}
          </div>
        );
      case "settings":
        return (
          <div className={styles["settings-content"]}>
            <h3>Edit Profile</h3>
            <div className={styles["settings-form"]}>
              <div className={styles["input-group"]}>
                <input
                  type="text"
                  placeholder="User Name"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className={styles["name-input"]}
                />
              </div>
              <div className={styles["input-group"]}>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles["email-input"]}
                />
              </div>
              <div className={styles["input-group"]}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles["password-input"]}
                />
              </div>
              <div className={styles["input-group"]}>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={styles["confirm-password-input"]}
                />
              </div>
              <div className={styles["button-group"]}>
                <button className={styles["save-button"]} onClick={handleSaveChanges}>
                  Save Changes
                </button>
                <button className={styles["logout-button"]} onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles["user-page"]}>
      <div className={styles["user-info"]}>
        <div className={styles["profile-container"]}>
          {profilePic ? (
            <div className={styles["profile-wrapper"]}>
              <img
                src={profilePic}
                alt="Profile"
                className={styles["profile-image"]}
              />
              <button
                className={styles["delete-button"]}
                onClick={() => setIsDeleting(true)}
              >
                🗑️
              </button>
            </div>
          ) : (
            <div className={styles["profile-placeholder"]}>
              <span className={styles["profile-symbol"]}>
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <button className={styles["upload-button"]}>
            <label>
              Add Image
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                style={{ display: "none" }}
              />
            </label>
          </button>
        </div>
        <div className={styles["user-details"]}>
          <h3 className={styles["user-name"]}>{userName}</h3>
        </div>
      </div>

      {isDeleting && (
        <div className={styles["delete-popup"]}>
          <div className={styles["delete-popup-content"]}>
            <div className={styles["popup-buttons"]}>
              <button className={styles["confirm-button"]} onClick={handleDeleteImage}>
                Yes
              </button>
              <button
                className={styles["cancel-button"]}
                onClick={() => setIsDeleting(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles["tabs"]}>
        <button
          className={`${styles["tab-button"]} ${
            activeTab === "savedRecipes" ? styles["active"] : ""
          }`}
          onClick={() => setActiveTab("savedRecipes")}
        >
          Saved Recipes
        </button>
        <button
          className={`${styles["tab-button"]} ${
            activeTab === "settings" ? styles["active"] : ""
          }`}
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
