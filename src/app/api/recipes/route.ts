import { NextResponse } from "next/server";

// Hardcoded recipes dataset
const recipes = [
  {
    title: "Vegetable Stir-Fry",
    ingredients: ["Carrots", "Broccoli", "Onions"],
    instructions: "Chop all vegetables, stir-fry them in a pan with oil and seasoning.",
  },
  {
    title: " Jackfruit & Spinach Stir-Fry",
    ingredients: ["Garlic", "Jackfruit", "Spinach"],
    instructions: "Heat oil in a pan and sauté garlic until fragrant,Add shredded jackfruit and cook for 5 minutes,Stir in spinach and cook for another 2 minutes,Serve warm with rice or roti.",
  },
  {
    title: "Eggplant & Tomato Curry",
    ingredients: ["Eggplant", "Tomato", "Onion"],
    instructions: "Heat oil in a pan and sauté onions until golden,Add eggplant and cook for 5 minutes,Stir in tomatoes, cover, and cook for another 10 minutes until soft,Serve hot with rice or bread.",
  },

  {
    title: " Banana & Blueberry Smoothie",
    ingredients: ["Bananas", "Blueberries", "Yogurt"],
    instructions: "Blend banana, blueberries, and milk/yogurt until smooth,Pour into a glass and serve chilled.",
  },
  {
    title: " Garlic Butter Chicken with Broccoli",
    ingredients: ["Chicken", "Broccoli", "Garlic"],
    instructions: "Heat oil in a pan and sauté garlic until fragran,Add chicken and cook until golden brow,Add broccoli and stir-fry for 5 minutes,Serve warm with rice or bread.",
  },
];

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json();

    // Filter recipes that include at least one of the selected ingredients
    const matchedRecipes = recipes.filter((recipe) =>
      recipe.ingredients.some((ing) => ingredients.includes(ing))
    );

    return NextResponse.json(matchedRecipes);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}
