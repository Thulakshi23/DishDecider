"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./UserPage.module.css";

// Define the structure of the user data we expect to receive
interface User {
  userName: string;
  email: string;
  profilePic: string | null;
}

const UserPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"savedRecipes" | "settings">("savedRecipes");
  const [userName, setUserName] = useState<string>("User Name");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [newUserName, setNewUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter(); // Added router

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user'); // Adjust the URL if necessary
        if (!response.ok) throw new Error('Failed to fetch user data.');

        const userData: User = await response.json();
        setUserName(userData.userName);
        setEmail(userData.email);
        setProfilePic(userData.profilePic);
        setNewUserName(userData.userName);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSaveChanges = () => {
    if (newUserName.trim() !== "") {
      setUserName(newUserName);
      alert("Profile updated successfully!");
    } else {
      alert("Please enter a valid name.");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', { method: 'POST' }); // Adjust the URL if necessary
      if (!response.ok) throw new Error('Failed to log out.');

      alert("Logged out successfully!");
      setUserName("User Name");
      setProfilePic(null);
      setEmail("");
      router.push("/");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setProfilePic(null);
    setIsDeleting(false);
  };

  const renderTabContent = () => {
    if (activeTab === "savedRecipes") {
      return (
        <div className={styles["grid-container"]}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className={styles["grid-item"]}>
              Recipe {item}
            </div>
          ))}
        </div>
      );
    }
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
  };

  return (
    <div className={styles["user-page"]}>
      {loading && <p>Loading user data...</p>}
      {error && <p>Error: {error}</p>}

      <div className={styles["user-info"]}>
        <div className={styles["profile-container"]}>
          {profilePic ? (
            <div className={styles["profile-wrapper"]}>
              <img src={profilePic} alt="Profile" className={styles["profile-image"]} />
              <button className={styles["delete-button"]} onClick={() => setIsDeleting(true)}>
                🗑️
              </button>
            </div>
          ) : (
            <div className={styles["profile-placeholder"]}>
              <span className={styles["profile-symbol"]}>
                {(email && email.charAt(0).toUpperCase()) || userName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <button className={styles["upload-button"]}>
            <label>
              Add Image
              <input type="file" accept="image/*" onChange={handleProfileImageChange} style={{ display: "none" }} />
            </label>
          </button>
        </div>
        <div className={styles["user-details"]}>
          <h3 className={styles["user-name"]}>{userName}</h3>
          <p className={styles["user-email"]}>{email}</p>
        </div>
      </div>

      {isDeleting && (
        <div className={styles["delete-popup"]}>
          <div className={styles["delete-popup-content"]}>
            <div className={styles["popup-buttons"]}>
              <button className={styles["confirm-button"]} onClick={handleDeleteImage}>
                Yes
              </button>
              <button className={styles["cancel-button"]} onClick={() => setIsDeleting(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles["tabs"]}>
        <button
          className={`${styles["tab-button"]} ${activeTab === "savedRecipes" ? styles["active"] : ""}`}
          onClick={() => setActiveTab("savedRecipes")}
        >
          Saved Recipes
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
