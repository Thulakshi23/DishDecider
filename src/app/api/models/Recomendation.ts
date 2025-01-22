import mongoose, { Schema, model, Document } from "mongoose";

export interface RecommendationDocument extends Document {
  userId: mongoose.Types.ObjectId;
  recommendedDishes: mongoose.Types.ObjectId[]; // Array of dish IDs
}

const recommendationSchema = new Schema<RecommendationDocument>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recommendedDishes: [{ type: mongoose.Types.ObjectId, ref: "Dish" }],
});

export default mongoose.models.Recommendation || model<RecommendationDocument>("Recommendation", recommendationSchema);
