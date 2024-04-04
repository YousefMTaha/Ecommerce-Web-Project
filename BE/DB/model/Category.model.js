import { Schema, Types, model } from "mongoose";
const categorySchema = new Schema(
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
    image: Object,
  },
  {
    timestamps: true,
  }
);

const categoryModel = model("Category", categorySchema);
export default categoryModel;
