// src/utils/apiService.ts
import axios from 'axios';

const APP_ID = '04c92f4b'; // Replace with your actual Edamam APP ID
const APP_KEY = '19967026af0a9f9da695d36e8c9cbebe'; // Edamam API Key
const BASE_URL = ' https://api.edamam.com/api/recipes/v2';

export const fetchRecipesByIngredients = async (ingredients: string[]) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        type: 'public',
        q: ingredients.join(','),
        app_id: APP_ID,
        app_key: APP_KEY,
      },
    });
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error; // Handle error appropriately
  }
};
