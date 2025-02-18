// "use client";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// interface Recipe {
//   id: number;
//   name: string;
//   ingredients: string[];
//   steps: string[];
// }

// export default function RecipePage() {
//   const searchParams = useSearchParams();
//   const ingredient = searchParams ? searchParams.get("ingredient") : null;
//   const [recipes, setRecipes] = useState<Recipe[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (ingredient) {
//       fetch(`/api/recipes?ingredient=${ingredient}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setRecipes(data);
//           setLoading(false);
//         })
//         .catch((error) => console.error("Error fetching recipes:", error));
//     }
//   }, [ingredient]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">Recipes with {ingredient}</h1>
//       {recipes.length > 0 ? (
//         recipes.map((recipe) => (
//           <div key={recipe.id} className="p-4 border rounded-lg mt-4">
//             <h2 className="text-xl font-semibold">{recipe.name}</h2>
//             <h3 className="font-semibold mt-2">Steps:</h3>
//             <ul className="list-decimal ml-5">
//               {recipe.steps.map((step, index) => (
//                 <li key={index}>{step}</li>
//               ))}
//             </ul>
//           </div>
//         ))
//       ) : (
//         <p>No recipes found for this ingredient.</p>
//       )}
//     </div>
//   );
// }
