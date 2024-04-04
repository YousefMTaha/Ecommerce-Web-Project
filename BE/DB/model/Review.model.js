import { Schema, Types, model } from "mongoose";
const reviewSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    rating: Number,
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const reviewModel = model("Review", reviewSchema);
export default reviewModel;
