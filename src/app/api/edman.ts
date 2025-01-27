import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { ingredients } = req.body;

      // Dummy data for testing
      const dummyRecipes = [
        {
          title: 'Veggie Stir Fry',
          ingredients: ['Carrots', 'Broccoli', 'Bell Peppers', 'Garlic'],
          instructions: 'Stir fry all ingredients in a pan with olive oil.',
        },
        {
          title: 'Fruit Salad',
          ingredients: ['Apples', 'Bananas', 'Strawberries'],
          instructions: 'Chop all fruits and mix in a bowl.',
        },
        {
          title: 'Chicken Salad',
          ingredients: ['Chicken', 'Lettuce', 'Tomatoes', 'Cucumbers'],
          instructions: 'Mix all ingredients in a bowl and dress with vinaigrette.',
        },
      ];

      // Filter recipes based on selected ingredients
      const filteredRecipes = dummyRecipes.filter(recipe =>
        recipe.ingredients.some(ingredient => ingredients.includes(ingredient))
      );

      // Return the filtered recipes
      res.status(200).json(filteredRecipes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
