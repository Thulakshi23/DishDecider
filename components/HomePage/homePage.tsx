"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./homePage.css";

const HomePage: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [showAdditionalIngredients, setShowAdditionalIngredients] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked && selectedIngredients.length >= 5) {
      return; // Prevent selecting more than 5
    }

    setSelectedIngredients((prev) =>
      checked ? [...prev, value] : prev.filter((ingredient) => ingredient !== value)
    );
  };

  const clearIngredients = () => {
    setSelectedIngredients([]);
    setRecipes([]); // Clear recipes when ingredients are reset
  };

  const toggleAdditionalIngredients = () => {
    setShowAdditionalIngredients((prev) => !prev);
  };

  const fetchRecipes = async () => {
    if (selectedIngredients.length === 0) {
      alert("Please select at least one ingredient.");
      return;
    }

    setLoading(true); // Show loading indicator

    try {
      const response = await fetch("/api/edman", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: selectedIngredients }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await response.json();
      setRecipes(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  useEffect(() => {}, [selectedIngredients]);

  return (
    <div id="home-page" className="home-page">
      <div className="container">
        {/* Ingredient Selection */}
        <motion.div
          className="box"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>
            What's in Your Fridge? <span role="img" aria-label="thinking emoji">🤔</span>
          </h2>

          <button id="toggle-button" className="dropdown-btn" onClick={toggleAdditionalIngredients}>
            {showAdditionalIngredients ? "Hide Other Ingredients" : "Show Other Ingredients"}
          </button>

          {/* Fresh Vegetables Section */}
          <div id="vegetables-section">
            <h3>Fresh Vegetables</h3>
            <ul className="ingredient-grid">
              {["Jackfruit", "Eggplant", "Pumpkin", "Drumstick", "Okra", "Carrots"].map((veg) => (
                <li key={veg}>
                  <input
                    type="checkbox"
                    value={veg}
                    onChange={handleCheckboxChange}
                    disabled={selectedIngredients.length >= 5 && !selectedIngredients.includes(veg)}
                  />{" "}
                  {veg}
                </li>
              ))}
            </ul>
          </div>

          <AnimatePresence>
            {showAdditionalIngredients && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                {/* Fruits Section */}
                <div id="fruits-section">
                  <h3>Fresh Fruits</h3>
                  <ul className="ingredient-grid">
                    {["Apples", "Bananas", "Oranges", "Grapes", "Pineapples"].map((fruit) => (
                      <li key={fruit}>
                        <input
                          type="checkbox"
                          value={fruit}
                          onChange={handleCheckboxChange}
                          disabled={selectedIngredients.length >= 5 && !selectedIngredients.includes(fruit)}
                        />{" "}
                        {fruit}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Selected Ingredients */}
        <aside className="your-ingredients">
          <h2>Your Ingredients</h2>
          <div className={`ingredients-list ${selectedIngredients.length === 0 ? "empty" : ""}`}>
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
            <button id="find-recipes-btn" className="find-recipes-btn" onClick={fetchRecipes} disabled={loading}>
              {loading ? "Fetching..." : "Find Recipes"}
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
            {loading ? (
              <p>Loading recipes...</p>
            ) : recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <li key={index}>
                  <h3>{recipe.title}</h3>
                  <p>
                    <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                  </p>
                  <p>
                    <strong>Instructions:</strong> {recipe.instructions}
                  </p>
                </li>
              ))
            ) : (
              <p>No recipes found for the selected ingredients.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
