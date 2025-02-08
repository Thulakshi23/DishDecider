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
  const [savedRecipes, setSavedRecipes] = useState<{ name: string; image: string }[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) throw new Error('');

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

  useEffect(() => {
    // Sample data from Cloudinary
    const sampleRecipes = [
      {
        name: "Recipe 1",
        image: "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622733/Backround3_m2rxq9.jpg",
      },
      {
        name: "Recipe 2",
        image: "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622732/pexels-alesiakozik-6544243_ird6qq.jpg",
      },
      {
        name: "Recipe 3",
        image: "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622732/pexels-catscoming-674574_fhricj.jpg",
      },
      {
        name: "Recipe 4",
        image: "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622729/Tomato-Rice_v4v8mp.webp",
      },
      {
        name: "Recipe 5",
        image: "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622729/Tomato-Rice_v4v8mp.webp",
      },
      {
        name: "Recipe 6",
        image: "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622733/Backround3_m2rxq9.jpg",
      },
    ];

    setSavedRecipes(sampleRecipes);
  }, []);

  const handleSaveChanges = () => {
    if (newUserName.trim()) {
      setUserName(newUserName);
      alert("Profile updated successfully!");
    } else {
      alert("Please enter a valid name.");
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
        <div className={styles.gridContainer}>
          {savedRecipes.length > 0 ? (
            savedRecipes.map((recipe, index) => (
              <div key={index} className={styles.gridItem}>
                <img src={recipe.image} alt={recipe.name} className={styles.recipeImage} />
                <p>{recipe.name}</p>
              </div>
            ))
          ) : (
            <p>No saved recipes yet.</p>
          )}
        </div>
      );
    }

    return (
      <div className={styles.settingsContent}>
        <h3>Edit Profile</h3>
        <div className={styles.settingsForm}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="User Name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className={styles.nameInput}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailInput}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.passwordInput}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.confirmPasswordInput}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.saveButton} onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.userPage}>
      {loading && <p className={styles.loading}>Loading user data...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}

      <div className={styles.userInfo}>
        <div className={styles.profileContainer}>
          {profilePic ? (
            <div className={styles.profileWrapper}>
              <img src={profilePic} alt="Profile" className={styles.profileImage} />
              <button className={styles.deleteButton} onClick={() => setIsDeleting(true)}>
                🗑️
              </button>
            </div>
          ) : (
            <div className={styles.profilePlaceholder}>
              <span className={styles.profileSymbol}>
                {(email.charAt(0).toUpperCase() || userName.charAt(0).toUpperCase())}
              </span>
            </div>
          )}
          <button className={styles.uploadButton}>
            <label>
              Add Image
              <input type="file" accept="image/*" onChange={handleProfileImageChange} style={{ display: "none" }} />
            </label>
          </button>
        </div>
        <div className={styles.userDetails}>
          <h3 className={styles.userName}>{userName}</h3>
          <p className={styles.userEmail}>{email}</p>
        </div>
      </div>

      {isDeleting && (
        <div className={styles.deletePopup}>
          <div className={styles.deletePopupContent}>
            <p>Are you sure you want to delete your profile image?</p>
            <div className={styles.popupButtons}>
              <button className={styles.confirmButton} onClick={handleDeleteImage}>
                Yes
              </button>
              <button className={styles.cancelButton} onClick={() => setIsDeleting(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === "savedRecipes" ? styles.active : ""}`}
          onClick={() => setActiveTab("savedRecipes")}
        >
          Saved Recipes
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "settings" ? styles.active : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          Profile
        </button>
      </div>

      <div className={styles.tabContent}>{renderTabContent()}</div>
    </div>
  );
};

export default UserPage;
