"use client";

import React, { useState, useEffect } from "react";
import "./mealPlanner.css";

const sampleDishes = [
  {
    imageUrl: "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1739422958/Garlic_Butter_Chicken_with_Broccoli_junsvb.jpg",
    name: "Garlic Butter Chicken",
  },
  {
    imageUrl: "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1739422937/Eggplant_Tomato_Curry_wvym2i.jpg",
    name: "Eggplant Tomato Curry",
  },
  {
    imageUrl: "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1739423000/Vegetable_Stir-Fry_easgop.jpg",
    name: "Vegetable Stir-Fry",
  },
  {
    imageUrl: "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737622729/Tomato-Rice_v4v8mp.webp",
    name: "Tomato Rice",
  },
  {
    imageUrl: "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1739422978/Jackfruit_Spinach_Stir-Fry_vocmoa.jpg",
    name: "Jackfruit & Spinach Stir-Fry",
  },
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const MealPlanner: React.FC = () => {
  const [dishes, setDishes] = useState<{ imageUrl: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const backgroundImageUrl =
    "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1737558632/samples/food/fish-vegetables.jpg";

  const [selectedMeals, setSelectedMeals] = useState<{
    [day: string]: {
      breakfast: number[];
      lunch: number[];
      dinner: number[];
    };
  }>(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = { breakfast: [], lunch: [], dinner: [] };
      return acc;
    }, {} as { [day: string]: { breakfast: number[]; lunch: number[]; dinner: number[] } })
  );

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(""); // API URL needs to be set
        if (!response.ok) throw new Error("Failed to fetch dishes");
        const data = await response.json();
        setDishes(data.length > 0 ? data : sampleDishes); // Use sample dishes if API returns empty
      } catch (err) {
        setDishes(sampleDishes); // Use sample dishes if there's an error
        setError("");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  const handleMealClick = (day: string, mealType: "breakfast" | "lunch" | "dinner", index: number) => {
    setSelectedMeals((prevSelected) => ({
      ...prevSelected,
      [day]: {
        ...prevSelected[day],
        [mealType]: prevSelected[day][mealType].includes(index)
          ? prevSelected[day][mealType].filter((mealIndex) => mealIndex !== index)
          : [...prevSelected[day][mealType], index],
      },
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/savedMeals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    setSelectedMeals(
      daysOfWeek.reduce((acc, day) => {
        acc[day] = { breakfast: [], lunch: [], dinner: [] };
        return acc;
      }, {} as { [day: string]: { breakfast: number[]; lunch: number[]; dinner: number[] } })
    );
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
            daysOfWeek.map((day) => (
              <div className="day-section" key={day}>
                <h2>{day}</h2>
                <div className="meal-type">
                  <h3>Breakfast</h3>
                  <div className="grid-container">
                    {dishes.map((dish, index) => (
                      <div
                        className="grid-item"
                        key={`${day}-breakfast-${index}`}
                        onClick={() => handleMealClick(day, "breakfast", index)}
                      >
                        <img
                          src={dish.imageUrl}
                          alt={dish.name}
                          className={`meal-image ${selectedMeals[day].breakfast.includes(index) ? "selected" : ""}`}
                        />
                        <p className="meal-name">{dish.name}</p>
                      </div>
                    ))}
                  </div>
                  <h3>Lunch</h3>
                  <div className="grid-container">
                    {dishes.map((dish, index) => (
                      <div
                        className="grid-item"
                        key={`${day}-lunch-${index}`}
                        onClick={() => handleMealClick(day, "lunch", index)}
                      >
                        <img
                          src={dish.imageUrl}
                          alt={dish.name}
                          className={`meal-image ${selectedMeals[day].lunch.includes(index) ? "selected" : ""}`}
                        />
                        <p className="meal-name">{dish.name}</p>
                      </div>
                    ))}
                  </div>
                  <h3>Dinner</h3>
                  <div className="grid-container">
                    {dishes.map((dish, index) => (
                      <div
                        className="grid-item"
                        key={`${day}-dinner-${index}`}
                        onClick={() => handleMealClick(day, "dinner", index)}
                      >
                        <img
                          src={dish.imageUrl}
                          alt={dish.name}
                          className={`meal-image ${selectedMeals[day].dinner.includes(index) ? "selected" : ""}`}
                        />
                        <p className="meal-name">{dish.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="right-panel">
          <div className="preview-box">
            <h3>Selected Meals for the Week</h3>
            {daysOfWeek.map((day) => (
              <div key={day} className="day-preview">
                <h4>{day}</h4>
                <div className="meal-preview">
                  {selectedMeals[day].breakfast.length > 0 && (
                    <div className="meal-time">
                      <strong>Breakfast:</strong>
                      <ul>
                        {selectedMeals[day].breakfast.map((mealIndex) => (
                          <li key={`${day}-breakfast-${mealIndex}`}>
                            {dishes[mealIndex]?.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedMeals[day].lunch.length > 0 && (
                    <div className="meal-time">
                      <strong>Lunch:</strong>
                      <ul>
                        {selectedMeals[day].lunch.map((mealIndex) => (
                          <li key={`${day}-lunch-${mealIndex}`}>
                            {dishes[mealIndex]?.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedMeals[day].dinner.length > 0 && (
                    <div className="meal-time">
                      <strong>Dinner:</strong>
                      <ul>
                        {selectedMeals[day].dinner.map((mealIndex) => (
                          <li key={`${day}-dinner-${mealIndex}`}>
                            {dishes[mealIndex]?.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {Object.values(selectedMeals[day]).flat().length === 0 && (
                    <p>No meals selected for {day}</p>
                  )}
                </div>
              </div>
            ))}
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