"use client"; // Ensure this component is treated as a client component

import React, { useEffect, useState } from 'react';
import './homePage.css'; // CSS import

const HomePage: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [showAdditionalIngredients, setShowAdditionalIngredients] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    setSelectedIngredients((prev) =>
      checked ? [...prev, value] : prev.filter((ingredient) => ingredient !== value)
    );
  };

  const clearIngredients = () => {
    setSelectedIngredients([]);
  };

  const toggleAdditionalIngredients = () => {
    setShowAdditionalIngredients((prev) => !prev);
  };

  useEffect(() => {
    // Any necessary side effects or state updates can be handled here
  }, [selectedIngredients]);

  return (
    <div id="home-page" className="home-page">
      <div className="container">
        {/* Ingredients Selection Section */}
        <div className="box">
          <h2>
            What's in Your Fridge? <span role="img" aria-label="thinking emoji">🤔</span>
          </h2>
          <button
            id="toggle-button"
            className="dropdown-btn"
            onClick={toggleAdditionalIngredients}
          >
            {showAdditionalIngredients ? 'Hide Ingredients' : 'Click Here for All Ingredients'}
          </button>
          <div className="ingredient-list">
            <div id="vegetables-section">
              <h3>Vegetables</h3>
              <ul>
                {['Jackfruit', 'Eggplant', 'Pumpkin', 'Drumstick', 'Okra'].map((veg) => (
                  <li key={veg}>
                    <input type="checkbox" value={veg} onChange={handleCheckboxChange} /> {veg}
                  </li>
                ))}
              </ul>
            </div>
            {showAdditionalIngredients && (
              <div id="additional-sections">
                <h3>Non-Vegetarian Dishes</h3>
                <ul>
                  {['Chicken', 'Fish', 'Eggs'].map((dish) => (
                    <li key={dish}>
                      <input type="checkbox" value={dish} onChange={handleCheckboxChange} /> {dish}
                    </li>
                  ))}
                </ul>
                <h3>Other Ingredients</h3>
                <ul>
                  {['Curry Leaves', 'Mustard Seeds', 'Fenugreek Seeds'].map((ingredient) => (
                    <li key={ingredient}>
                      <input type="checkbox" value={ingredient} onChange={handleCheckboxChange} /> {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Selected Ingredients Section */}
        <aside className="your-ingredients">
          <h2>Your Ingredients</h2>
          <div className={`ingredients-list ${selectedIngredients.length === 0 ? 'empty' : ''}`}>
            <ul id="selected-ingredients">
              {selectedIngredients.length > 0 ? (
                selectedIngredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))
              ) : (
                <li>No ingredients selected</li>
              )}
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
