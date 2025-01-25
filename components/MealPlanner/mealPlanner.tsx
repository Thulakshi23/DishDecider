"use client"; // Add this line at the top to mark it as a client component

import React, { useState } from 'react';
// Remove local imports for images
// import backgroundImage from '../../public/assets/Background2.jpg'; // No longer needed
import './mealPlanner.css'; // Import the CSS file

const MealPlanner: React.FC = () => {
  // Replace local images with Cloudinary URLs
  const mealImages = [
    "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622732/pexels-catscoming-674574_fhricj.jpg", // Replace with your Cloudinary URLs
    "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622732/pexels-catscoming-674574_fhricj.jpg",
    "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622731/pexels-fotios-photos-1358389_tvzxdm.jpg",
    "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622732/pexels-alesiakozik-6544243_ird6qq.jpg",
    "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622731/pexels-fotios-photos-1358389_tvzxdm.jpg",
  ];

  // Add your Cloudinary background image URL
  const backgroundImageUrl = "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737558632/samples/food/fish-vegetables.jpg"; // Replace with your Cloudinary background image URL

  const [selectedMeals, setSelectedMeals] = useState<{ [key: string]: number[] }>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  const handleSave = () => {
    console.log('Saved meals:', selectedMeals);
  };

  const handleCancel = () => {
    setSelectedMeals({
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    });
  };

  const handleMealClick = (day: string, index: number) => {
    setSelectedMeals((prevSelected) => ({
      ...prevSelected,
      [day]: prevSelected[day].includes(index)
        ? prevSelected[day].filter((mealIndex) => mealIndex !== index)
        : [...prevSelected[day], index],
    }));
  };

  return (
    <div
      className="mealPlanner"
      style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover' }} // Inline style for Cloudinary background image
    >
      <h1>Weekly Meal Planner</h1>
      <div className="main-section">
        {/* Left Panel */}
        <div className="left-panel">
          {Object.keys(selectedMeals).map((day) => (
            <div key={day} className="day-section">
              <h2>{day}</h2>
              <div className="grid-container">
                {mealImages.map((image, index) => (
                  <div
                    className="grid-item"
                    key={index}
                    onClick={() => handleMealClick(day, index)}
                  >
                    <img
                      src={image}
                      alt={`Meal ${index + 1}`}
                      className={`meal-image ${selectedMeals[day].includes(index) ? 'selected' : ''}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Right Panel */}
        <div className="right-panel">
          <div className="preview-box">
            <h3>Selected Meals</h3>
            <ul>
              {Object.entries(selectedMeals).map(([day, meals]) => (
                meals.length > 0 ? (
                  <li key={day}>
                    <strong>{day}:</strong> {meals.map((mealIndex) => `Meal ${mealIndex + 1}`).join(', ')}
                  </li>
                ) : null
              ))}
              {Object.values(selectedMeals).flat().length === 0 && <p>No meals selected</p>}
            </ul>
          </div>
          <div className="button-group">
            <button className="cancel-btn" onClick={handleCancel}>
              Clear Selection
            </button>
            <button className="save-btn" onClick={handleSave}>
              Save Meals
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
