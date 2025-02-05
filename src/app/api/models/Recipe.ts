import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  ingredients: [String],
});

export default mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
