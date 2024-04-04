import { Schema, Types, model } from "mongoose";
const subcategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: Object,
  },
  {
    timestamps: true,
  }
);

const subcategoryModel = model("Subcategory", subcategorySchema);
export default subcategoryModel;
