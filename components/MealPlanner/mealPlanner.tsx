"use client";

import React, { useState, useEffect } from "react";
import "./mealPlanner.css";

const MealPlanner: React.FC = () => {
  const [dishes, setDishes] = useState<{ imageUrl: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const backgroundImageUrl =
    "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737558632/samples/food/fish-vegetables.jpg";

  const sampleDishes = [
    {
      imageUrl: "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1739422958/Garlic_Butter_Chicken_with_Broccoli_junsvb.jpg",
      name: "Garlic Butter Chicken",
    },
    {
      imageUrl: "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1739422937/Eggplant_Tomato_Curry_wvym2i.jpg",
      name: "Eggplant Tomato curry",
    },
    {
      imageUrl: "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1739423000/Vegetable_Stir-Fry_easgop.jpg",
      name: "Vegetable Stir-Fry",
    },
    {
      imageUrl:"https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622729/Tomato-Rice_v4v8mp.webp",
      name: "Tomato rice",
    },
    {
      imageUrl: "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1739422978/Jackfruit_Spinach_Stir-Fry_vocmoa.jpg",
      name: "Jackfruit & Spinach Stir-Fry",
    },
  ];

  const [selectedMeals, setSelectedMeals] = useState<Record<string, number[]>>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch("");
        if (!response.ok) throw new Error("Failed to fetch dishes");
        const data = await response.json();
        setDishes(data.length > 0 ? data : sampleDishes); // Use sample dishes if API returns empty
      } catch (err) {
        setDishes(sampleDishes); // Use sample dishes on error
        setError("");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meals: selectedMeals }),
      });

      if (!response.ok) throw new Error("Failed to save mea.");

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
          {error && <p className="error-message">{error}</p>}
          {loading ? (
            <p>Loading dishes...</p>
          ) : (
            Object.keys(selectedMeals).map((day) => (
              <div key={day} className="day-section">
                <h2>{day}</h2>
                <div className="grid-container">
                  {dishes.map((dish, index) => (
                    <div
                      className="grid-item"
                      key={index}
                      onClick={() => handleMealClick(day, index)}
                    >
                      <img
                        src={dish.imageUrl}
                        alt={dish.name}
                        className={`meal-image ${selectedMeals[day].includes(index) ? "selected" : ""}`}
                      />
                      <p className="meal-name">{dish.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="right-panel">
          <div className="preview-box">
            <h3>Selected Meals</h3>
            <ul>
              {Object.entries(selectedMeals).map(([day, meals]) =>
                meals.length > 0 ? (
                  <li key={day}>
                    <strong>{day}:</strong> {meals.map((mealIndex) => dishes[mealIndex]?.name).join(", ")}
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
