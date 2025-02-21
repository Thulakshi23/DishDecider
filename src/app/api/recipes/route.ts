import { NextResponse } from "next/server";

// Hardcoded recipes dataset with Cloudinary images
const recipes = [
  {
    title: "Vegetable Stir-Fry",
    ingredients: ["Carrots", "Broccoli", "Onions"],
    instructions: "Chop all vegetables, stir-fry them in a pan with oil and seasoning.",
    image: "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1739423000/Vegetable_Stir-Fry_easgop.jpg",
  },
  {
    title: "Jackfruit & Spinach Stir-Fry",
    ingredients: ["Garlic", "Jackfruit", "Spinach"],
    instructions: "Heat oil in a pan and sauté garlic until fragrant. Add shredded jackfruit and cook for 5 minutes. Stir in spinach and cook for another 2 minutes. Serve warm with rice or roti.",
    image: "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1739422978/Jackfruit_Spinach_Stir-Fry_vocmoa.jpg",
  },
  
  {
    title: "Eggplant & Tomato Curry",
    ingredients: ["Eggplant", "Tomato", "Onions"],
    instructions: "Heat oil in a pan and sauté onions until golden. Add eggplant and cook for 5 minutes. Stir in tomatoes, cover, and cook for another 10 minutes until soft. Serve hot with rice or bread.",
    image: "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1739422937/Eggplant_Tomato_Curry_wvym2i.jpg",
  },
  {
    title: "Banana & Blueberry Smoothie",
    ingredients: ["Bananas", "Blueberries", "Yogurt"],
    instructions: "Blend banana, blueberries, and milk/yogurt until smooth. Pour into a glass and serve chilled.",
    image: "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1739422897/Banana_Blueberry_Smoothie_nrgyhc.jpg",
  },
  {
    title: "Garlic Butter Chicken with Broccoli",
    ingredients: ["Chicken", "Broccoli", "Garlic"],
    instructions: "Heat oil in a pan and sauté garlic until fragrant. Add chicken and cook until golden brown. Add broccoli and stir-fry for 5 minutes. Serve warm with rice or bread.",
    image: "https://res.cloudinary.com/dgvx2zkcb/image/upload/v1739422958/Garlic_Butter_Chicken_with_Broccoli_junsvb.jpg",
  },
  


];

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json();

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json({ error: "Please provide at least one ingredient." }, { status: 400 });
    }

    // Filter recipes that include at least one of the selected ingredients
    const matchedRecipes = recipes.filter((recipe) =>
      ingredients.every((ingredient) => recipe.ingredients.includes(ingredient))
    );

    return NextResponse.json(
      matchedRecipes.length > 0
        ? matchedRecipes
        : [{ title: "No recipes found", ingredients: [], instructions: "Try selecting different ingredients.", image: "" }]
    );
  } catch {
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}
