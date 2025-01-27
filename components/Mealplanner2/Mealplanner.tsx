// src/components/MealPlanner.tsx
import React, { useState } from 'react';
import { fetchRecipesByIngredients } from '../../src/utils/meal/apiservice';
import './Mealplanner.css'; // Import your CSS file

const MealPlanner: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>('');
  const [recipes, setRecipes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFetchRecipes = async () => {
    if (!ingredients.trim()) {
      setError('Please enter at least one ingredient.');
      return;
    }

    try {
      const fetchedRecipes = await fetchRecipesByIngredients(ingredients.split(','));
      setRecipes(fetchedRecipes);
      setError(null); // Reset error state
    } catch (err) {
      setError('Failed to fetch recipes. Please try again later.');
    }
  };

  return (
    <div className="meal-planner">
      <h2>Meal Planner</h2>
      <input
        type="text"
        placeholder="Enter ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button onClick={handleFetchRecipes}>Get Recipes</button>
      {error && <p className="error">{error}</p>}
      <ul>
        {recipes.map((item) => (
          <li key={item.recipe.uri}>
            <h3>{item.recipe.label}</h3>
            <img src={item.recipe.image} alt={item.recipe.label} />
            <a href={item.recipe.url} target="_blank" rel="noopener noreferrer">View Recipe</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealPlanner;
