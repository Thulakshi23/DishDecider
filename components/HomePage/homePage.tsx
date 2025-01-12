"use client"; // Add this line at the top to mark it as a client component

import React, { useState } from 'react';
import './homePage.css'; // CSS import

const HomePage: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [showAdditionalIngredients, setShowAdditionalIngredients] = useState(false);

  // Handle checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedIngredients((prev) => [...prev, value]);
    } else {
      setSelectedIngredients((prev) => prev.filter((ingredient) => ingredient !== value));
    }
  };

  // Clear the selected ingredients
  const clearIngredients = () => {
    setSelectedIngredients([]);
    document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  // Toggle additional ingredients
  const toggleAdditionalIngredients = () => {
    setShowAdditionalIngredients((prev) => !prev);
  };

  return (
    <div id="home-page" className="home-page">
      <div className="container">
        {/* Ingredients Selection Section */}
        <div className="box">
          <h2>What's in Your Fridge?</h2>
          <button id="toggle-button" className="dropdown-btn" onClick={toggleAdditionalIngredients}>
            {showAdditionalIngredients ? 'Hide Ingredients' : 'Click Here for All Ingredients'}
          </button>
          <div className="ingredient-list">
            <div id="vegetables-section">
              <h3>Vegetables</h3>
              <ul>
                <li>
                  <input type="checkbox" value="Jackfruit" onChange={handleCheckboxChange} /> Jackfruit
                </li>
                <li>
                  <input type="checkbox" value="Eggplant" onChange={handleCheckboxChange} /> Eggplant
                </li>
                <li>
                  <input type="checkbox" value="Pumpkin" onChange={handleCheckboxChange} /> Pumpkin
                </li>
                <li>
                  <input type="checkbox" value="Drumstick" onChange={handleCheckboxChange} /> Drumstick
                </li>
                <li>
                  <input type="checkbox" value="Okra" onChange={handleCheckboxChange} /> Okra
                </li>
              </ul>
            </div>
            {showAdditionalIngredients && (
              <div id="additional-sections">
                <h3>Non-Vegetarian Dishes</h3>
                <ul>
                  <li>
                    <input type="checkbox" value="Chicken" onChange={handleCheckboxChange} /> Chicken
                  </li>
                  <li>
                    <input type="checkbox" value="Fish" onChange={handleCheckboxChange} /> Fish
                  </li>
                  <li>
                    <input type="checkbox" value="Eggs" onChange={handleCheckboxChange} /> Eggs
                  </li>
                </ul>
                <h3>Other Ingredients</h3>
                <ul>
                  <li>
                    <input type="checkbox" value="Curry Leaves" onChange={handleCheckboxChange} /> Curry Leaves
                  </li>
                  <li>
                    <input type="checkbox" value="Mustard Seeds" onChange={handleCheckboxChange} /> Mustard Seeds
                  </li>
                  <li>
                    <input type="checkbox" value="Fenugreek Seeds" onChange={handleCheckboxChange} /> Fenugreek Seeds
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Selected Ingredients Section */}
        <aside className="your-ingredients">
          <h2>Your Ingredients</h2>
          <div className="ingredients-list">
            <ul id="selected-ingredients">
              {selectedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="button-container">
            <button id="find-recipes-btn" className="find-recipes-btn">
              Find Recipes
            </button>
            <button id="clear-btn" className="clear-btn" onClick={clearIngredients}>
              Clear
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
