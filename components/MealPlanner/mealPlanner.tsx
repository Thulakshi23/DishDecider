"use client";

import React, { useState } from "react";
import "./mealPlanner.css";

const MealPlanner: React.FC = () => {
  const mealImages = [
    "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622732/pexels-catscoming-674574_fhricj.jpg",
    "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622732/pexels-catscoming-674574_fhricj.jpg",
    "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622731/pexels-fotios-photos-1358389_tvzxdm.jpg",
    "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622732/pexels-alesiakozik-6544243_ird6qq.jpg",
    "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622731/pexels-fotios-photos-1358389_tvzxdm.jpg",
  ];

  const backgroundImageUrl =
    "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737558632/samples/food/fish-vegetables.jpg";

  const [selectedMeals, setSelectedMeals] = useState<Record<string, number[]>>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  const handleMealClick = (day: string, index: number) => {
    setSelectedMeals((prevSelected) => ({
      ...prevSelected,
      [day]: prevSelected[day].includes(index)
        ? prevSelected[day].filter((mealIndex) => mealIndex !== index)
        : [...prevSelected[day], index],
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/savedMeals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ meals: selectedMeals }),
      });

      if (!response.ok) throw new Error("Failed to save meals.");

      const data = await response.json();
      console.log("Saved meals:", data);
      alert("Meals saved successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving meals.");
    }
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

  return (
    <div
      className="mealPlanner"
      style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: "cover" }}
    >
      <h1>Weekly Meal Planner</h1>
      <div className="main-section">
        <div className="left-panel">
          {Object.keys(selectedMeals).map((day) => (
            <div key={day} className="day-section">
              <h2>{day}</h2>
              <div className="grid-container">
                {mealImages.map((image, index) => (
                  <div className="grid-item" key={index} onClick={() => handleMealClick(day, index)}>
                    <img
                      src={image}
                      alt={`Meal ${index + 1}`}
                      className={`meal-image ${selectedMeals[day].includes(index) ? "selected" : ""}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="right-panel">
          <div className="preview-box">
            <h3>Selected Meals</h3>
            <ul>
              {Object.entries(selectedMeals).map(([day, meals]) =>
                meals.length > 0 ? (
                  <li key={day}>
                    <strong>{day}:</strong> {meals.map((mealIndex) => `Meal ${mealIndex + 1}`).join(", ")}
                  </li>
                ) : null
              )}
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
