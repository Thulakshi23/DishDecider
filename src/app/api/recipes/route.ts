import { NextResponse } from "next/server";

// Sample data (Replace with database query)
const recipes = [
  {
    id: 1,
    name: "Pasta",
    ingredients: ["Tomato", "Garlic", "Pasta"],
    steps: [
      "Boil water and cook pasta.",
      "Heat oil in a pan and sauté garlic.",
      "Add tomatoes and cook until soft.",
      "Mix the pasta with the sauce and serve."
    ]
  },
  {
    id: 2,
    name: "Garlic Bread",
    ingredients: ["Garlic", "Bread", "Butter"],
    steps: [
      "Preheat oven to 180°C.",
      "Mix butter and garlic, then spread on bread.",
      "Bake for 10 minutes and serve."
    ]
  }
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ingredient = searchParams.get("ingredient");

  if (!ingredient) {
    return NextResponse.json({ error: "Ingredient is required" }, { status: 400 });
  }

  // Find recipes containing the ingredient
  const filteredRecipes = recipes.filter(recipe =>
    recipe.ingredients.includes(ingredient)
  );

  return NextResponse.json(filteredRecipes);
}
