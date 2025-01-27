"use client"; // Ensure this component is treated as a client component

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion components
import './homePage.css'; // CSS import

const HomePage: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [showAdditionalIngredients, setShowAdditionalIngredients] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked && selectedIngredients.length >= 5) {
      alert("You can only select up to 5 ingredients.");
      return;
    }

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

  const fetchRecipes = async () => {
    if (selectedIngredients.length === 0) {
      alert("Please select at least one ingredient.");
      return; // Prevent fetching if no ingredients are selected
    }

    try {
      const response = await fetch('/api/edman', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: selectedIngredients }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      setRecipes(data);
      setError(null); // Clear any previous error
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    // Any necessary side effects or state updates can be handled here
  }, [selectedIngredients]);

  return (
    <div id="home-page" className="home-page">
      <div className="container">
        {/* Ingredients Selection Section */}
        <motion.div
          className="box"
          initial={{ opacity: 0 }} // Initial state
          animate={{ opacity: 1 }} // Animate to this state
          exit={{ opacity: 0 }} // Exit animation
          transition={{ duration: 0.5 }} // Transition duration
        >
          <h2>
            What's in Your Fridge? <span role="img" aria-label="thinking emoji">🤔</span>
          </h2>
          
          {/* Button to show/hide additional ingredients */}
          <button
            id="toggle-button"
            className="dropdown-btn"
            onClick={toggleAdditionalIngredients}
          >
            {showAdditionalIngredients ? 'Hide Other Ingredients' : 'Show Other Ingredients'}
          </button>

          {/* Fresh Vegetables Section */}
          <div id="vegetables-section">
            <h3>Fresh Vegetables</h3>
            <ul className="ingredient-grid">
              {['Jackfruit', 
                  'Eggplant', 
                  'Pumpkin', 
                  'Drumstick', 
                  'Okra', 
                  'Carrots', 
                  'Beetroots', 
                  'Spinach', 
                  'Broccoli', 
                  'Zucchini', 
                  'Tomatoes', 
                  'Cucumbers', 
                  'Onions', 
                  'Garlic', 
                  'Mushrooms'].map((veg) => (
                <li key={veg}>
                  <input type="checkbox" value={veg} onChange={handleCheckboxChange} /> {veg}
                </li>
              ))}
            </ul>
          </div>

          {/* Show additional ingredients when the button is clicked */}
          <AnimatePresence>
            {showAdditionalIngredients && (
              <motion.div
                initial={{ opacity: 0 }} // Initial state for additional ingredients
                animate={{ opacity: 1 }} // Animate to this state
                exit={{ opacity: 0 }} // Exit animation
                transition={{ duration: 0.5 }} // Transition duration
              >
                {/* Fresh Fruits Section */}
                <div id="fruits-section">
                  <h3>Fresh Fruits</h3>
                  <ul className="ingredient-grid">
                    {['Apples', 
                        'Bananas', 
                        'Oranges', 
                        'Grapes', 
                        'Pineapples', 
                        'Mangoes', 
                        'Strawberries', 
                        'Blueberries', 
                        'Peaches', 
                        'Pears', 
                        'Kiwis', 
                        'Lemons', 
                        'Limes', 
                        'Cherries', 
                        'Watermelons'].map((fruit) => (
                      <li key={fruit}>
                        <input type="checkbox" value={fruit} onChange={handleCheckboxChange} /> {fruit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Non-Vegetarian Dishes Section */}
                <div id="non-veg-section">
                  <h3>Non-Vegetarian Dishes</h3>
                  <ul className="ingredient-grid">
                    {['Chicken', 'Fish', 'Eggs'].map((dish) => (
                      <li key={dish}>
                        <input type="checkbox" value={dish} onChange={handleCheckboxChange} /> {dish}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dairy Products Section */}
                <div id="dairy-section">
                  <h3>Dairy Products</h3>
                  <ul className="ingredient-grid">
                    {['Milk', 'Cheese', 'Yogurt', 'Butter', ].map((dairy) => (
                      <li key={dairy}>
                        <input type="checkbox" value={dairy} onChange={handleCheckboxChange} /> {dairy}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Selected Ingredients Section */}
        <aside className="your-ingredients">
          <h2>Your Ingredients</h2>
          <div className={`ingredients-list ${selectedIngredients.length === 0 ? 'empty' : ''}`}>
            <ul id="selected-ingredients">
              {selectedIngredients.length > 0 ? (
                selectedIngredients.map((ingredient, index) => (
                  <motion.li key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    {ingredient}
                  </motion.li>
                ))
              ) : (
                <li>No ingredients selected</li>
              )}
            </ul>
          </div>
          <div className="button-container">
            <button id="find-recipes-btn" className="find-recipes-btn" onClick={fetchRecipes}>
              Find Recipes
            </button>
            <button id="clear-btn" className="clear-btn" onClick={clearIngredients}>
              Clear
            </button>
          </div>
        </aside>

        {/* Recipes Section */}
        <div className="recipes-section">
          <h2>Recipes</h2>
          {error && <p className="error-message">{error}</p>}
          <ul className="recipes-list">
            {recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <li key={index}>
                  <h3>{recipe.title}</h3>
                  <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                  <p><strong>Instructions:</strong> {recipe.instructions}</p>
                </li>
              ))
            ) : (
              <li>No recipes found.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
