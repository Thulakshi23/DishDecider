"use client"; // Add this line at the top to mark it as a client component

import React, { useState } from 'react';
import img1 from '../../public/assets/pexels-catscoming-674574.jpg';
import img2 from '../../public/assets/pexels-adonyi-foto-1414651.jpg';
import img3 from '../../public/assets/pexels-catscoming-674574.jpg';
import img4 from '../../public/assets/pexels-catscoming-674574.jpg';
import img5 from '../../public/assets/pexels-catscoming-674574.jpg';
import backgroundImage from '../../public/assets/pexels-enginakyurt-1435904.jpg'; // Import background image
import './mealPlanner.css'; // Import the CSS file
import { motion } from 'framer-motion'; // Import Framer Motion components

const MealPlanner: React.FC = () => {
  const mealImages = [img1, img2, img3, img4, img5];
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
      style={{ backgroundImage: `url(${backgroundImage.src})` }} // Inline style for background image
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }} // Initial state for animation
        animate={{ opacity: 1, y: 0 }} // Animate to this state
        transition={{ duration: 0.5 }} // Transition duration
      >
        Weekly Meal Planner
      </motion.h1>
      <div className="main-section">
        {/* Left Panel */}
        <motion.div
          className="left-panel"
          initial={{ opacity: 0, x: -50 }} // Initial state for animation
          animate={{ opacity: 1, x: 0 }} // Animate to this state
          transition={{ duration: 0.5 }} // Transition duration
        >
          {Object.keys(selectedMeals).map((day) => (
            <motion.div
              key={day}
              className="day-section"
              initial={{ opacity: 0 }} // Initial state for animation
              animate={{ opacity: 1 }} // Animate to this state
              transition={{ duration: 0.5 }} // Transition duration
            >
              <h2>{day}</h2>
              <div className="grid-container">
                {mealImages.map((image, index) => (
                  <div
                    className="grid-item"
                    key={index}
                    onClick={() => handleMealClick(day, index)}
                  >
                    <motion.img
                      src={image.src}
                      alt={`Meal ${index + 1}`}
                      className={`meal-image ${selectedMeals[day].includes(index) ? 'selected' : ''}`}
                      initial={{ scale: 1 }} // Initial scale for image
                      whileHover={{ scale: 1.05 }} // Scale effect on hover
                      transition={{ duration: 0.2 }} // Transition duration for hover effect
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* Right Panel */}
        <motion.div
          className="right-panel"
          initial={{ opacity: 0, x: 50 }} // Initial state for animation
          animate={{ opacity: 1, x: 0 }} // Animate to this state
          transition={{ duration: 0.5 }} // Transition duration
        >
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
            <motion.button
              className="cancel-btn"
              onClick={handleCancel}
              whileHover={{ scale: 1.05 }} // Scale effect on hover
              whileTap={{ scale: 0.95 }} // Scale effect on tap
            >
              Clear Selection
            </motion.button>
            <motion.button
              className="save-btn"
              onClick={handleSave}
              whileHover={{ scale: 1.05 }} // Scale effect on hover
              whileTap={{ scale: 0.95 }} // Scale effect on tap
            >
              Save Meals
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MealPlanner;
